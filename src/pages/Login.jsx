import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import {useState,useEffect} from 'react'
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { ToastText } from '../components/ToastElements';


const Container =styled.div`
height: 100vh;
weight:100vw;
background:linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
),
url("https://static.zara.net/photos///2022/I/0/1/p/0518/251/537/2/w/750/0518251537_2_5_1.jpg?ts=1666173710849")
center;
background-repeat: no-repeat;
background-size: 50% 100% 100%;

display:flex;
align-items:center;
justify-content:center;
`;
const Wrapper =styled.div`
padding:20px;
width: 25%;
background-color:transparent;
${mobile({width:"75%"})}

`;
const  Title=styled.h1`
font-size:24px;
font-weight:300;
`;
const  Form =styled.form`
display:flex;
flex-direction:column;
`;
const Input =styled.input`
flex:1;
min-width: 40%;
margin: 10px 0px;
padding: 10px;
background-color:transparent;
font-weight: 700;
`;
const Button =styled.button`
width: 50%;
border:none;
padding: 15px 20px;
background-color:teal;
color:white;
cursor:pointer;
font-size:19px;
margin-bottom:10px;
&:disabled{
    color: green,
    cursor:not-allowed
}
`;
const Link = styled.a`
margin:5px 0px;
font-size: 12px;
text-decoration: underline;
cursor: pointer
`;

const ToastContainer = styled.div`
position:fixed;
left:575px;
bottom:180px;
padding:10px 12px;
border-radius:10px;
background: ${(props)=>props.bg};
`

export default function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching,error} = useSelector((state)=>state.user)
    const [ toast, setToast ] = useState({
    text:'',
    status: false,
    bg: ''
    })
    useEffect(()=>{
        let myTimeout;
        if(toast.status) {
             myTimeout = setTimeout(()=>{
                setToast({
                    ...toast,
                    status:false,
                });
            }, 1000)
        }
        return ()=> clearTimeout(myTimeout)
    },[toast])
    
    const handleClick =(e)=>{
        e.preventDefault()
    login(dispatch,{username,password})
     error ? 
     setToast({
    text:'Worng Username or Password Credentials....',
     status: true,
     bg: 'red' }): 
    setToast({ 
    text:'Successfully Logged In ',
     status: true,
     bg: 'green'})
   
}
  return (
   <Container>
    <Wrapper>
        <Title> SIGN IN</Title>
        <Form>
            <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder="password" type = "password" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
            {<ToastContainer bg= {toast.bg}>
                <ToastText>{toast.text}</ToastText>
                </ToastContainer>}
            <Link>FORGOT PASSWORD</Link>
            <Link to = "/register">CREATE A NEW ACCOUNT</Link>
        </Form>
    </Wrapper>
   </Container>
  )
}
