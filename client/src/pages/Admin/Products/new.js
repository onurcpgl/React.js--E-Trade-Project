import React from 'react'
import { message } from 'antd';

import { Text,Box, FormControl, FormLabel,Input, Textarea, Button } from '@chakra-ui/react'
import { postProduct } from "../../../api";
import {  useMutation, useQueryClient } from "react-query";

import { Formik, FieldArray } from "formik";

import validationSchema from "./validations";

function NewProduct() {
    const queryClient= useQueryClient();
    
    const newProductMutation=useMutation(postProduct,{
        onSuccess: () => queryClient.invalidateQueries("admin:products"),
    });
    
   
    
    const handleSubmit = async (values, bag) => {
        console.log(values);
        message.loading({content:'Loading', key:"product_update"});

        // values.photos = JSON.stringify(values.photos);

        const newValues= {
            ...values,
            photos:JSON.stringify(values.photos),
        }

        newProductMutation.mutate(newValues, {
            onSuccess: () => {
                console.log("success");
                message.success({
                    content:"The product successfully updateed",
                    key: "product_update",
                    duration: 2,
                });
            },
        });
    };

  return (
    <div>
       
        <Text fontSize="2xl" ml="10" mt="10">New Product</Text>
        
        <Formik
            initialValues={{
                title: "data.title",
                description: "data.description",
                price: "data.price",
                photos: [],
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
                                    Save
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

export default NewProduct