import {useMemo} from 'react'

import {useQuery, useMutation, useQueryClient} from "react-query";
import {NavLink} from "react-router-dom";
import {  fetchProductList , deleteProduct } from "../../../api";

import { Text,Button,Flex} from '@chakra-ui/react'

import { Table, Popconfirm } from "antd";

function Products() {
  const queryClient= useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchProductList
  );


  const deleteMutation= useMutation(deleteProduct,{
    refetechQuaries: ['admin:products'],
  });

  const columns= useMemo(() => {
    return [
      {
        title:'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title:'Price',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'Created At',
        dataIndex:'createdAt',
        key:'createdAt'
      },
      {
        title:'Action',
        key:'action',
        render: (text,record) =>(
          <>
            <NavLink to={`${record._id}`}>Edit</NavLink>
            <Popconfirm   
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id,{
                  onSuccess: () => {
                    console.log("success");
                    queryClient.invalidateQueries("admin:products");
                  },
                })
              }}
              onCancel={() => {
                console.log("silindi");
              }}
              okText="Yes"
              cancelText="No"
              placement='left'
            >
              <a href="/#" style={{marginLeft:10}}>Delete</a>
            </Popconfirm>
          </>
        ) 
      },
      
    ]
  },[]);


  if(isLoading){
    return <div>Looading..</div>
  }

  if(isError){
    return <div>Error {error.message}</div>
  }
  console.log(data);
  return (
    <div>
      
     

      <Button colorScheme="green" mt="5" >
                    <NavLink to="newproduct">
                        Add Product
                    </NavLink>
      </Button>
      
      
      <Text fontSize="2xl" p="5">
        Products
      </Text>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  )
}

export default Products