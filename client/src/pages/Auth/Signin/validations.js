import * as Yup from "yup";

const validations = Yup.object().shape({

    email: Yup
        .string()
        .email("Geçerli bir email giriniz !")
        .required("Zorunlu alan."),
    password: Yup
        .string()
        .min(5,"Parolanız en az 5 karakterden oluşmalı.")
        .required(),
    
});

export default validations;
