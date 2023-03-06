import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import {mobile} from '../responsive'
import { useState } from 'react';
import { signup } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';


const Container =styled.div`
height: 100vh;
weight:100vw;
background:linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
),
url("https://static.zara.net/photos///2022/I/L/1/p/2205/005/000/2/w/750/2205005000_1_1_1.jpg?ts=1665058643739")
center;
background-repeat: repeat;
display:flex;
align-items:center;
justify-content:center;
`;
const Wrapper =styled.div`
padding:20px;
width: 40%;
background-color:transparent;
${mobile({width:"75%"})}

`;
const  Title=styled.h1`
font-size:24px;
font-weight:300;
`;
const  Form =styled.form`
display:flex;
flex-wrap:wrap;
`;
const Input =styled.input`
flex:1;
min-width: 40%;
margin: 20px 10px 0px 00px;
padding: 10px;
background-color:transparent;
font-weight: 700;
`;
const Agreement =styled.span`
font-size: 12px;
margin: 20px 0px;
`;
const Button =styled.button`
width: 40%;
border:none;
padding: 15px 20px;
background-color:teal;
color:white;
cursor:pointer;
font-size:19px;
`;


export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const { isFetching } = useSelector((state)=>state.user)
    const handleClick = (e)=>{
        signup(dispatch,{username,password,email,firstName,lastName,confirmPassword})
    }


  return (
   <Container>
    <Wrapper>   
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
            <Input placeholder="first name" onChange={(e)=>setFirstName(e.target.value)}/>
            <Input placeholder="last name" onChange={(e)=>setLastName(e.target.value)}/>
            <Input placeholder="username"  onChange={(e)=>setUsername(e.target.value)}/> 
            <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <Input placeholder="password" type = "password" onChange={(e)=>setPassword(e.target.value)}/>
            <Input placeholder="confirm password" type = "password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <Agreement>
                By Creating an account, I consent to the processing of my personal
                data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
        </Form>
    </Wrapper>
   </Container>
  )
}
