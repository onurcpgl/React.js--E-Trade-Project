
import { React, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
    Alert, 
    Image, 
    Button, 
    Box, 
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
    Textarea,
} from '@chakra-ui/react'

import { useBasket } from "../../context/BasketContext";
import { postOrder } from '../../api';


function Basket() {
    const [address, setAddress] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    
    const {items, removeFromBasket, emptyBasket} = useBasket();

    const total=items.reduce((acc,obj) => acc+obj.price, 0);

    const submitHandleForm = async () => {
        const itemIds= items.map((item) => item._id);

        const input = {
            address,
            items: JSON.stringify(itemIds),
        };

        const response = await postOrder(input);
        emptyBasket();
        onClose();
   
    };
    

  return (
    <Box p="10">
        {
            items.length < 1 && (<Alert status='warning'>Sepetinizde Ürün Yok !</Alert>)
        }
        {
            items.length > 0 && 
            <>
                <ul>
                    {
                        items.map((item) => (
                            <li key={item._id}>
                                <NavLink to={`/product/${item._id}`}>
                                    {item.title} - {item.price}TL
                                    <Image  htmlWidth={200} src={item.photos[0]} alt="basket item" /> 
                                </NavLink>

                                <Button mt="2" size="sm" colorScheme="green" onClick={() =>  removeFromBasket(item._id)}>
                                    Remove Basket Item
                                </Button>
                            </li>
                        ))
                    }
                </ul>
                 <Box>
                    <Text fontSize="22">
                        Total : {total}
                    </Text>         
                </Box>

                <Button onClick={onOpen}>
                    Order
                </Button>

                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                        <ModalBody pb={6}>

                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </FormControl>

                          
                            
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={submitHandleForm}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                 </Modal>

                    
                
            </>
        }

       
    </Box>
  )
}

export default Basket