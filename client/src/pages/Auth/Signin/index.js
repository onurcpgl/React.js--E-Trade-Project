import React from 'react'

import { Heading, Box, Flex, Button, Input, FormControl, FormLabel, Alert } from '@chakra-ui/react'

import { useFormik } from "formik";
import validationSchema from "./validations";

import { fetchLogin } from "../../../api";

import { useAuth } from "../../../context/AuthContext";

import { useNavigate } from "react-router-dom"; 

function Signin() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit: async(values,bag) => {
      try {
        const loginData = await fetchLogin({email: values.email, password: values.password,});
        login(loginData);
        navigate("/profile");
        
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    }
  });


  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>{formik.errors.general} </Alert>
                )
            }
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name="email" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
                autoFocus={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel mt="4">Password</FormLabel>
                <Input name="password" type="password" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
                 />
              </FormControl>

           

              <Button mt="4" width="full" type='submit'>Sign In</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin
