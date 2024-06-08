import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

const Success = () => {
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
        <Heading color="blue" size="2xl">Success!</Heading>
        <Text color="blue" fontSize="xl">This page will redirect to the home page in 5 seconds...</Text>
      </VStack>
    </Box>
  );
};

export default Success;
