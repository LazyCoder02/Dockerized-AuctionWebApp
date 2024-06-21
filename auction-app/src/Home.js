// src/Home.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Flex,
  VStack,
  HStack,
  Link,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  MenuGroup,
  MenuDivider,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure

} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "./actions";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleLogIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleItems = () => {
    navigate("/manage-items");
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
    toast({
      title: "Logout successful.",
      description: "You have been logged out.",
      status: "success",
      duration: 5000,
      isClosable: true
    });
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const accountDetails = {
      name: formData.get("name"),
      email: user.email,
      password: formData.get("password")
    };

    try {
      const response = await fetch(`http://localhost:3030/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(accountDetails)
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast({
          title: "Account updated.",
          description: "Your account has been updated.",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        dispatch(updateUser(accountDetails.name));

      } else {
        toast({
          title: "An error occurred.",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }

    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to update account.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }

  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/api/users/${user.id}`, {
        method: "DELETE"
      });

      toast({
        title: "Account deleted.",
        description: "Your account has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      dispatch(logoutUser());
      navigate("/");

    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to delete account.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };
  return (
    <Box as="nav" bg="white" w="100vw" px="5vw" mb="3" borderBottom="1px solid #E2E8F0">
      <Flex justify="space-between" align="center" py="4">
        <Link to="/" color="black" fontSize="2xl">
          AuctionEase
        </Link>
        <Flex gap="4" direction="row">
          {isLoggedIn ? (
            <Menu>
              <MenuButton as={Button} variant={"solid"} bg="blue" color="white" _hover={{ bg: "grey" }}>
                {user.name}
              </MenuButton>
              <MenuList>
                <MenuGroup title='Account'>
                  <>
                    <MenuItem onClick={onOpen}>Edit profile</MenuItem>

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <form onSubmit={handleUpdateAccount}>
                          <ModalHeader>Profile</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>

                            <VStack spacing={3}>
                              <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input name="name" placeholder={user.email} />
                              </FormControl>

                              <FormControl id="email" isDisabled>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" placeholder={user.email} />
                              </FormControl>

                              <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input name="password" placeholder="Password" />
                              </FormControl>
                            </VStack>
                          </ModalBody>
                          <Divider />
                          <ModalFooter>
                            <VStack spacing={3} w="100%">
                              <Button type="submit" bg="blue" color="white" _hover={{ bg: "grey" }} minW="full">
                                Update account
                              </Button>
                              <Button bg="red" color="white" _hover={{ bg: "#e63946" }} minW="full" onClick={handleDeleteAccount}>
                                Delete account
                              </Button>
                            </VStack>
                          </ModalFooter>
                        </form>
                      </ModalContent>
                    </Modal>
                  </>
                  <MenuItem onClick={handleItems}>Manage items</MenuItem>
                </MenuGroup >
                <MenuDivider />
                <MenuGroup >
                  <MenuItem color={"red"} onClick={handleLogOut}>Log out</MenuItem>
                </MenuGroup >
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={2}>
              <Button variant="solid" bg="grey" color="white" onClick={handleRegister} _hover={{ bg: "blue" }}>
                Register
              </Button>
              <Button variant="solid" bg="blue" color="white" onClick={handleLogIn} _hover={{ bg: "grey" }}>
                Login
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex >
    </Box >
  );
};

const Banner = () => {
  return (
    <Box
      minW="90vw"
      maxW="90vw"
      bgImage="url('https://images.unsplash.com/photo-1565689157206-0fddef7589a2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgPosition="center"
      bgSize="cover"
      align="center"
      px="100"
      py="200"
      mb="3"
      borderWidth={1}
      borderColor={"gray.200"}
      borderRadius="lg"
      boxShadow="lg">
      <Heading color={"blue"} size={"3xl"}>Where you find every product</Heading>
      <Text color={"blue"}>The best products at the best prices</Text>
    </Box>
  );
};

const ItemCard = ({ item }) => {
  const [thisItem, setThisItem] = useState(1);
  const toast = useToast();

  const redirectToWebsite = (url) => {
    window.location.href = url;
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();

    const buyOrder = {
      success_url: "http://localhost:3000/success",
      priceID: item.stripePriceID,
      quantity: thisItem
    }

    try {
      const response = await fetch("http://localhost:3030/api/payments/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buyOrder),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok'");
      }

      const data = await response.json();
      console.log("Data:", data);

      redirectToWebsite(data.url);

    } catch (error) {
      console.error("There was an error adding the item: ", error);
    }
  };

  const handleDownload = () => {
    redirectToWebsite(`http://localhost:3030/api/items/${item.productID}/download`)
    toast(
      {
        title: "Download Started",
        description: `Starting download ${item.productName}'s data`,
        status: "info",
        duration: 9000,
        isClosable: true,
      }
    );
  };

  return (
    <Card
      width="350px"
      margin="2"
      borderWidth={1}
      borderColor={"gray.200"}
      borderRadius="lg"
      boxShadow="lg"
    >
      <CardHeader>
        <Text size="md">{item.productCategory}</Text>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack mt="3" spacing="3">
          <Heading size="md">{item.productName}</Heading>
          <Text>{item.productDescription}</Text>
          <Text fontSize="sm">
            Available items: {item.quantity}
          </Text>
          <Text color="blue.600" fontSize="xl">
            ${item.pricePerUnit} / unit
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Stack mt="3" spacing="3" w="100%">
          <NumberInput defaultValue={thisItem} min={1} max={item.quantity} w="100%" onChange={setThisItem}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <ButtonGroup spacing="2">
            <Button variant="solid" bg="blue" color="white" _hover={{ bg: "grey" }} w="50%" onClick={handleBuyNow}>
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue" w="50%" onClick={handleDownload}>
              Download info
            </Button>
          </ButtonGroup>
        </Stack>
      </CardFooter>
    </Card>
  );
};

const UserItemCard = ({ item }) => {
  const [thisItem, setThisItem] = useState(1);

  return (
    <Card
      width="350px"
      margin="2"
      borderWidth={1}
      borderColor={"gray.200"}
      borderRadius="lg"
      boxShadow="lg"
    >
      <CardHeader>
        <Text size="md">{item.productCategory}</Text>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack mt="3" spacing="3">
          <Heading size="md">{item.productName}</Heading>
          <Text>{item.productDescription}</Text>
          <Text fontSize="sm">
            Available items: {item.quantity}
          </Text>
          <Text color="blue.600" fontSize="xl">
            ${item.pricePerUnit} / unit
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Stack mt="3" spacing="3" w="100%">
          <NumberInput defaultValue={thisItem} min={1} max={item.quantity} w="100%" onChange={setThisItem}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </CardFooter>
    </Card>
  );
};

const AddItemForm = () => {
  const toast = useToast();
  const user = useSelector((state) => state.user);

  const handleSubmition = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get("productName"),
      quantity: formData.get("quantity"),
      price: formData.get("pricePerUnit"),
      category: formData.get("productCategory"),
      description: formData.get("productDescription"),
      userID: user.id
    };

    try {
      const response = await fetch("http://localhost:3030/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok'");
      }
      const data = await response.json();
      console.log("Item added successfully: ", data);

      toast({
        title: "Item added successfully",
        description: "Your item has been added to the store and is now available for purchase. Refresh page tp see item.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error("There was an error adding the item: ", error);
    }
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      maxW="md"
      mx="auto"
    >
      <form onSubmit={handleSubmition}>
        <VStack spacing={3}>
          <FormControl id="productName" isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input name="productName" placeholder="Item" />
          </FormControl>

          <FormControl id="productDescription" isRequired>
            <FormLabel>Product Description</FormLabel>
            <Input name="productDescription" placeholder="Description" />
          </FormControl>

          <FormControl id="productCategory" isRequired>
            <FormLabel>Category</FormLabel>
            <Select name="productCategory" placeholder="Select category">
              <option value="cameras">Cameras</option>
              <option value="phones">Phones</option>
              <option value="computers">Computers</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl id="quantity" isRequired>
            <FormLabel>Quantity</FormLabel>
            <NumberInput defaultValue={1} min={1} max={99}>
              <NumberInputField name="quantity" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl id="pricePerUnit" isRequired>
            <FormLabel>Price per unit</FormLabel>
            <NumberInput
              defaultValue={0.01}
              min={0.01}
              precision={2}
              step={0.01}
            >
              <NumberInputField name="pricePerUnit" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button type="submit" bg="blue" color="white" _hover={{ bg: "grey" }} minW="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const Options = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    // Fetch user items from the backend
    const fetchUserItems = async () => {
      try {
        const response = await fetch(`http://localhost:3030/api/items/${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched user items:", data);
        setUserItems(data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchUserItems();
  }, [user.id]);

  useEffect(() => {
    // Fetch items from the backend
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/items");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched items:", data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Box w="90vw" align="center">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Buy items</Tab>
          <Tab>Auction Item</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display="flex" flexWrap="wrap" justifyContent="left">
            {items.length > 0 ? (
              items.map((item) => <ItemCard key={item.productID} item={item} />)
            ) : (
              <Text>No items available</Text>
            )}
          </TabPanel>
          <TabPanel>
            {isLoggedIn ? (
              <Box>
                <AddItemForm />
                {userItems.length > 0 ? (
                  userItems.map((item) => <UserItemCard key={item.productID} item={item} />)
                ) : (
                  <Text>No items available</Text>
                )}

              </Box>
            ) : (
              <Box
                p={4}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                maxW="md"
                mx="auto"
                py={20}
              >
                <Heading size={"md"}>Log in to add an item</Heading>
              </Box>
            )
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Home = () => {
  return (
    <VStack minH="100vh" minW="100vw" display="flex" alignItems="center">
      <Navbar />
      <Banner />
      <Options />
    </VStack>
  );
};

export default Home;
