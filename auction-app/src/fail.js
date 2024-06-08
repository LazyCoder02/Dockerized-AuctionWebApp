import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

const Fail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box bg="white" h="100vh" w="100vw" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={4} textAlign="center">
        <Heading color="#e63946" size="2xl">Failed!</Heading>
        <Text color="#e63946" fontSize="xl">Something went wrong. Redirecting to the home page in 5 seconds...</Text>
      </VStack>
    </Box>
  );
};

export default Fail;
