import React from "react";
import { Grid,Box, Flex,Button, Spinner } from '@chakra-ui/react'
import Card from '../../components/Card'

import { useInfiniteQuery } from 'react-query'

import { fetchProductList } from "../../api.js";

function Products() {
    

    
    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status, 
    } = useInfiniteQuery(
        'products', 
        fetchProductList, 
        {
            getNextPageParam: (lastGroup, allGroup) => {
                const morePageExits = lastGroup?.length === 12;

                if(!morePageExits){
                    return;
                }
                return allGroup.length + 1;
            }
        },
      );
 
   if (status === "loading") return 
   <>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="orange"/>
      </Flex>
   </>
 ;
 
   if (status === "error") return 'An error has occurred: ' + error.message

  return (
    <div>
        
        <Grid  templateColumns="repeat(3, 1fr)"  gap={4}>
            
            {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                    {group.map((item) => (
                        <Box w="100%" key={item._id}>
                            <Card item={item} />
                        </Box>
                    ))}
                </React.Fragment>
            ))}
        </Grid>

        <Flex mt="10" justifyContent="center">
         <Button colorScheme="red"
           isLoading={isFetchingNextPage}
           onClick={() => fetchNextPage()}
           disabled={!hasNextPage || isFetchingNextPage}
         >
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </Button>
       </Flex>
       

    </div>
  )
}

export default Products