import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchProduct } from '../../api';
import moment from "moment";
import { Box,Text,Button, Flex, Spinner } from '@chakra-ui/react'

import ImageGallery from 'react-image-gallery';

import { useBasket } from "../../context/BasketContext";


function ProductDetail() {

  const { _id } = useParams();
  const { addToBasket, items } = useBasket();

  
  const {isLoading, error, data} = useQuery(['product', _id], () => 
    fetchProduct(_id)
  );

  if (isLoading) return 
    <>
       <Flex justifyContent="center" alignItems="center" height="100vh">
         <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="orange"/>
       </Flex>
    </>
  ;
 
  if (error) return 'An error has occurred: ' + error.message


  //İmage

  const images = data.photos.map((url) => ({original:url}));

  const findBasketItem = items.find((item) => item._id === _id );
 
  return (
    <div>
      {!isLoading &&
        <>
          <Button colorScheme="green" variant="solid" onClick={() => addToBasket(data, findBasketItem)}>
            {
              findBasketItem ? "Remove from basket" : "Add to basket"
            }
          </Button>
          <Text as="h2" fontSize="2xl">{data.title}</Text>
          <Text as="h2" fontSize="2xl">{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
          <p>{data.description}</p>
          <Box margin="10">
            <ImageGallery items={images}/>
          </Box>   
        </>
        }   
    </div>
  )
}

export default ProductDetail