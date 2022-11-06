import React from "react";
import axios from "axios";
import { useContext } from "react";
import {useState,useEffect} from "react"
import {CartContext} from "../Context/CartContext/CartContextProvider"
import {addToCart} from "../Context/CartContext/action"
import { Button, Container, Flex, Grid, GridItem, Skeleton, Stack,Box,Image,Text} from "@chakra-ui/react";

const getData = () =>{
return axios.get("https://fakestoreapi.com/products")
}
const itemAlreadyExist = (id,cartItems)=>{
if(cartItems.find((item)=>item.id===id)){
  return true
}
return false
}
// 0. axios should be used for making network requests;

// 1. API request should be made to `https://fakestoreapi.com/products` on mount and get the data and the same data should be displayed in the form of cards ( 3 per row in large screens, 2 per row  in medium screens and 1 per row  in small screen  )

// 2. loading, error and data state should be maintained; show proper loading indicator and error state when required;

// 3. each product card should atleast contain product image, title , price and a add to cart button;

// 4. cart data is maintained in the cart context and based on the cart data if the product is already added to the cart, then the add to cart button should be disabled for that particular product;

// 5. clicking on add to cart button will add the product to the cart; this cart is maintained in the cart context; as useReducer has been used for state management in cart context; you need to dispatch some add_to_cart action to add new product to the cart.

const Home = () => {
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false);
  const [data,setData] = useState([])
  const {state,dispatch} = useContext(CartContext)

  useEffect(()=>{
    setLoading(true)
    getData().then((res)=>{
      setData(res.data)
      setError(false)
    }).catch(()=>{
      setError(true)
      setData([])
    }).finally(()=>{
      setLoading(false)
    })
  },[])
  if(loading){
    return(
      <Stack my={20}>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
        <Skeleton height="40px"/>
      </Stack>
    )
  }
  if(error){
    return(<Container maxW={{base:"full",md:"container.xl"}}
      p={{base:2,lg:0}}>
        <Grid w="full" 
        templateColumns={{
          base:'repeat(1,1fr)',
          md:"repeat(2,1fr)",
          lg:"repeat(3,1fr)"
        }}
        gap={4}
        >
{
  data&&data.map((product)=>(
    <GridItem key={product.id}>
      <Box 
      bg="gray.50"
      column={{sm:2,md:4}}
      spacing="8"
      p={2}
      rounded="lg"
      color="gray.600"
      boxShadow="lg"
      >
        <Grid templateRows="repeat(24,1fr)"
        h="xl">
          <GridItem rowSpan={16}>
            <Flex align="center" justify="center">
              <Image boxSize="xs"
              src={product.Image}
              alt="prod-img"
              w="full"
              h="sm"
              />
            </Flex>
          </GridItem>
          <GridItem rowSpan={3}>
          <Flex align="center" justify="center"><Box>
            <Text textAlign="center">{product.title}</Text>
            </Box>
          </Flex>
          </GridItem>
          <GridItem rowSpan={2}>
          <Flex align="center" justify="center"><Box>
            <Text >INR:{product.price}</Text>
            </Box>
          </Flex>
          </GridItem>
          <GridItem rowSpan={3}>
          <Flex align="center" justify="center">
            <Button 
            colorScheme="gray"
            variant="outline"
            disabled={itemAlreadyExist(product.id,state)}
            onClick={()=>dispatch(addToCart(product))}
            >
              Add To Cart
            </Button>
          </Flex>
          </GridItem>
        </Grid>
      </Box>
    </GridItem>
  ))
}

        </Grid>
         
                 
    </Container>)
  }
  return <div>Home</div>;
};

export default Home;
