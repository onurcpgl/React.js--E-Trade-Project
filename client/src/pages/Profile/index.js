import { useAuth } from "../../context/AuthContext";

import { Text,Flex,Button } from '@chakra-ui/react'

import { useNavigate } from "react-router-dom"; 

function Profile() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        logout();
        navigate("/");
    };

  return (
    <Flex justifyContent="center">
        <Text fontSize="h1">Profile:  </Text>
        <code>{JSON.stringify(user)}</code>
        

        <br />
        <br />
        <br />

        <Button colorScheme="red" variant="solid" onClick={handleLogout}>
            Logout
        </Button>

    </Flex>
  )
};

export default Profile