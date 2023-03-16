import React, { useEffect } from 'react'
import styled, {keyframes} from 'styled-components'
import {Search,ShoppingCartOutlined} from "@material-ui/icons"
import {Badge} from "@material-ui/core";
import {mobile} from "../responsive";
import { useSelector } from 'react-redux';
import {Link, Navigate } from 'react-router-dom';
import { ToastText } from './ToastElements';
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userRedux'
import { emptyCart } from '../redux/cartRedux'
import { useState } from 'react';
import { popularProducts } from '../data';


const Container = styled.div`
height: 60px;
${mobile({height:"50px"})};
`;
const Wrapper = styled.div`
padding: 10px 20px;
display :flex;
align-items: center;
justify-content: space-between;
${mobile({padding:"10px 0px"})}
`;
const Left =styled.div`
flex:1;
display:flex;
align-items: center;
`;
const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({display:"none"})}
`;
const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding: 5px;
`;
const Input = styled.input`
border:none;
${mobile({width:"40px"})}
`;
const Center = styled.div`
flex: 1;
text-align:center;
`;
const Logo = styled.h1`
font-weight:bold;
cursor: pointer;
text-decoration:none;
${mobile({fontSize:"22.5px"})};
`;
const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({flex: 2, justifyContent:"center"})}
`;
const Hide =styled.div``;
const MenuItem = styled.div`
   font-size: 14px;
   cursor: pointer;
   margin-left: 25px;
${mobile({fontSize:"12px", marginLeft:"10px"})}
`;
const fadeOut = keyframes`
  from: { opacity: 1;};
  to: { opacity: 0;};
`;

export const ToastContainer = styled.div`
position:fixed;
right:40px;
top:0px;
padding:10px 12px;
border-radius:10px;
background: ${(props)=>props.bg};
animation-duration: ${fadeOut};
transition: all 0.3s ease-out;
`;
const Navbar = () => {
  const cart = useSelector((state)=>state.cart)
  const user = useSelector((state)=>state.user)
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
//  />
  const[toast ,setToast] = useState({
    text:"",
    status: false,
    bg:""
  })
  
  const notify = ()=>{
    dispatch(logout())
    dispatch(emptyCart()) ?
    setToast({
      text:"Successfully Logged Out",
      status: true,
      bg:'green'
    }): setToast(user.error &&{
      text:"Error",
      status: true,
      bg:'red'
    })
    
  }
  return (
    <Container>
         <Wrapper>
            <Left>  
                <Language>EN</Language>
                <SearchContainer >
                    <Input type="text" onChange={(e)=>setSearch(e.target.value)}/> 
                    <Search style={{color:"gray", fontSize:16}} type = "submit"  />
                    {popularProducts.title?.map(() => (
                  <img src={search} />
                   ))}
                  
                </SearchContainer>
                </Left>
                <Center>
                 <ToastContainer bg={toast.bg}>
                      <ToastText>{toast.text}</ToastText>
                    </ToastContainer>
               <Logo>
                <Link to = "/" style={{textDecoration: 'none', color:'teal'}}>FASHION.</Link>
                </Logo>
                </Center>
                <Right>
                  {/* {login} */}
                   
                   <Link to = "/register" style={{textDecoration: 'none', color:'teal'}}><MenuItem>REGISTER</MenuItem></Link>
                    <Link to = "/login" style={{textDecoration: 'none', color:'teal'}}><MenuItem>LOG IN</MenuItem></Link>
                    <Navigate to = "/"  onClick={notify} style={{textDecoration: 'none', color:'teal'}} ><MenuItem>LOGOUT</MenuItem></Navigate>
                    <MenuItem>
                    <Badge badgeContent={cart.quantity} color="secondary">
                    <Link to = "/cart">
                    <ShoppingCartOutlined  />
                    </Link>
                    </Badge>
                    </MenuItem>
                </Right>
         </Wrapper>
         </Container>
  )}

export default Navbar
