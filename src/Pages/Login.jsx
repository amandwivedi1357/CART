import React from "react";

// 0. axios should be used for making network requests;

// 1. input boxes which takes email and password from the user

// 2. in this page you should get the auth state from auth context and based on auth state;if user is already logged in then user should be redirected to home page

// 3. network request (POST) should be made to api endpoint `https://reqres.in/api/login` with email and password details;

// 4. button should not allow additional click till API call is complete; user should see loading indicator till API call is complete;

// 5. upon successful login, login success action is dispatched with token we get back as response and the authentication status and token is updated in the context API. user then gets redirected to home page;

// 6. Proper Alert should be displayed to user upon unsuccessful API call. the message can be `Something went wrong. please refresh.`


import {AlertIcon,AlertDescription,Alert,Button,Container,FormControl,FormHelperText,FormLabel,Input,VStack} from "@chakra-ui/react"
import {useState,useContext} from "react"
import {loginFailureAction,loginSuccessAction} from "../Context/AuthContext/action"
import {AuthContext} from "../Context/AuthContext/AuthContextProvider"
import axios from "axios";
import { Navigate } from "react-router-dom";


const Login = () => {
  const {state,Dispatch} = useContext(AuthContext)
  const [loginDet,setLoginDet] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
const {name,value}  = e.target;
setLoginDet({...loginDet,[name]:value})
  }
  const handleLogin = ()=>{
   axios({
    method:"POST",
    url:"https://reqres.in/api/login",
    data:loginDet
   }).then((res)=>{
    Dispatch(loginSuccessAction(res.data.token))
   }).catch(()=>{
    Dispatch(loginFailureAction())
   })
  };
  if(state.isAuth){
    return (<Navigate to="/" />)
  }
  if(state.isError){
    return(
      <Container width={{
        base:"full",
        md:"container.xl",
        lg:"container.lg",
        sm:"full"

      }}
      centerContent={true}>
        <Alert
        status="error"
        py={{base:4,sm:4,md:4,lg:6}}
        my={{base:24,sm:24,md:28,lg:40}}
        px={{base:1,sm:1,md:4,lg:6}}
        >
          <AlertIcon/>

          <AlertDescription>
           Something went Wrong.please refresh
          </AlertDescription>
        </Alert>
      </Container>
    )
  }
  const {email,password} = loginDet

  return (
    <Container width={{
      base:"full",
      sm:"full",
      md:"container.md",
      lg:"container.lg"
    }}
    centerContent={true}
    >
      <VStack width="full"
      boxShadow="lg"
      py={{base:4,sm:4,md:4,lg:6}}
      my={{base:24,sm:24,md:28,lg:40}}
      px={{base:2,sm:2,md:4,lg:6}}
      >
        <FormControl>
          <FormLabel>Email Address</FormLabel>
            <Input name="email"
                   type="email"
                   value={email}
                   onChange={handleChange}
            />
            <FormHelperText>We'll never share your details</FormHelperText>
            <FormLabel>Password</FormLabel>
            <Input name="email"
                   type="password"
                   value={password}
                   onChange={handleChange}
            />
            <Button ml={190} mt={5} onClick={handleLogin}>LOGIN</Button>
        </FormControl>

      </VStack>
      
    </Container>
  )
  
};

export default Login;
