// src/Login.js
import React, { useState } from "react";
import { loginUser } from "./actions";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    const userInfo = {
      email: email,
      password: password,
    };

    // Make an API request to register the user
    try {
      const response = await fetch("http://localhost:3030/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Show success toast
      toast({
        title: "Login successful.",
        description: "You are now logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      dispatch(loginUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      }));
      navigate("/");

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Login failed.",
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
        <Heading mt={4}>Welcome back!</Heading>
        <Text mb={4}>Please enter your details.</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
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
              Login
            </Button>
            <Button color={"gray.1000"} width="full" onClick={handleRegister}>
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
