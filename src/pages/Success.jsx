import React from 'react'
import Payment from '../assets/payment.gif'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../redux/cartRedux';
const Image = styled.div`
padding: 40px;
display: flex;
margin-left: 30%;
margin-bottom: -80px;
  `
const Container = styled.div`
`
const Success = () => {
  const dispatch = useDispatch();
  dispatch(emptyCart())
  return (
    <Container>
      <Navbar/>
      <Image>
      <img src = {Payment} alt = {"Payment"}/>
      </Image>
     <Footer/>
     </Container>
  )
}

export default Success
