import React from 'react'
import { message } from 'antd';
import { useParams,NavLink } from "react-router-dom";
import { Text,Box, FormControl, FormLabel,Input, Textarea, Button } from '@chakra-ui/react'
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";

import { Formik, FieldArray } from "formik";

import validationSchema from "./validations";

function ProductDetails() {
    const {_id} = useParams();
    
    const {isLoading, isError, data, error}= useQuery(
       ["admin:product",_id], 
       () => fetchProduct(_id)
       );

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error : {error.message}</div>
    }
    
    const handleSubmit = async (values, bag) => {
        console.log("sub");
        message.loading({content:'Loading', key:"product_update"});

        try {
            await updateProduct(values,_id);
            message.success({
                content:"The product successfully updated",
                key: "product_update",
                duration: 2,
            })
        } catch (e) {
            message.error("The product does not updated");
        }
    }

  return (
    <div>
       
        <Text fontSize="2xl" >Edit</Text>
        
        <Formik
            initialValues={{
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.photos,
            }}
            validationSchema={validationSchema}

            onSubmit={handleSubmit}
        >
            {

                ({handleSubmit,error, touched,handleChange ,handleBlur, values, isSubmitting}) => (
                    
                    <>
                        <Box m="10" >
                            <Box my="5" textAlign="center">
                                <form>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input 
                                            name= "title"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.title}
                                            disabled={isSubmitting}
                                           
                                        />
                                    </FormControl>
                                    <FormControl mt="4">
                                        <FormLabel>Description</FormLabel>
                                        <Textarea 
                                            name= "description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>

                                    <FormControl mt="4">
                                        <FormLabel>Price</FormLabel>
                                        <Input 
                                            name= "price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price}
                                            disabled={isSubmitting}
                                            
                                        />
                                    </FormControl>
                                    <FormControl mt="4">
                                        <FormLabel>Photos</FormLabel>
                                        <FieldArray 
                                            name="photos"
                                            render={(arrayHelpers) =>(
                                                <div>
                                                    {
                                                        values.photos && values.photos.map((photo,index) => (
                                                            <div key={index} >
                                                                <Input
                                                                    name={`photos.${index}`}
                                                                    value={photo}
                                                                    disabled={isSubmitting}
                                                                    onChange={handleChange}
                                                                    width="8xl"
                                                                />
                                                                <Button 
                                                                    ml="4" 
                                                                    type='button' 
                                                                    colorScheme="red"
                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        ))
                                                    }
                                                    <Button
                                                        mt="5"
                                                        onClick={() => arrayHelpers.push("")}
                                                       
                                                    >
                                                        Add a new photo
                                                    </Button>
                                                </div>
                                            )}
                                        />
                                    </FormControl>
                                   


                                   <Button 
                                        mt="4" 
                                        width="full" 
                                        type="submit" 
                                        isLoading={isSubmitting} 
                                        colorScheme="yellow" 
                                        onClick={handleSubmit}
                                    >
                                    Update
                                   </Button>
                                </form>

                            </Box>
                        </Box>
                    </>
                )
            }

        </Formik>
    </div>
  )
}

export default ProductDetails