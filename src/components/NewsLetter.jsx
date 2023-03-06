import styled from 'styled-components'
import {mobile} from '../responsive'
import React,{useEffect} from 'react'
import OneSignal from 'react-onesignal';

const Container = styled.div`
height: 60vh;
background-color:#FFEEEC;
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;
const Title = styled.h1`
font-size: 70px;
margin-bottom: 20px;
`;
const  Desc = styled.div`
font-size: 24px;
font-weight: 300;
margin-bottom: 20px;
${mobile({textAlign:"center"})};

`;
const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: white;
display:flex;
justify-content:space-between;
border: 1px solid lightgray;
${mobile({width:"80%"})}

`;
const Input = styled.input`
border: none;
flex: 8;
padding-left:18px

`;
const Button = styled.span`
 //flex:8;
 border:none;
// background-color: teal;
// color:white;

`;

const NewsLetter = () => {
   async function runOneSignal() {
    await OneSignal.init({ appId: '5d32ecf5-dad8-4d9d-8d5d-c4aecde6a541', allowLocalhostAsSecureOrigin: true});
    OneSignal.showSlidedownPrompt();
  }
  
  return (
   <Container>
    <Title>NewsLetter</Title>
    <Desc>Get timely updates from your favorite products.</Desc>
    <InputContainer>
    <Input placeholder='Your eamil' />
    <Button className='onesignal-customlink-container' onClick={useEffect(() => {
    runOneSignal();
  })}>
    </Button>
    </InputContainer>
   </Container>
  )
}

export default NewsLetter
