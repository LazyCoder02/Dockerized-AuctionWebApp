import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { loginUser } from "./actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an API request to register the user
    try {
      const response = await fetch("http://localhost:3030/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      // Show success toast
      toast({
        title: "Registration successful.",
        description: "You can now log in with your new account.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch(loginUser({
        id: data.id,
        name: data.name,
        email: data.email
      }));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Registration failed.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        p={4}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        mx="auto"
        w="full"
      >
        <Heading mt={4}>Join AuctionEase today</Heading>
        <Text mb={4}>Please enter your details.</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" bg="blue" color="white" _hover={{ bg: "grey" }} width="full">
              Register
            </Button>
            <Button color={"gray.1000"} width="full" onClick={handleLogin}>
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
