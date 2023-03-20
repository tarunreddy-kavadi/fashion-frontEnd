import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import Announcment from '../components/Announcment';
import Navbar from '../components/Navbar';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { Title } from './Cart';


const Image = styled.img`
width: 200px;
display:flex;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Favorite = () => {
  const cart = useSelector((state)=>state.cart.favorites)
  return (
    <div>
    <Announcment/>
    <Navbar/>
    <Title>WISH LIST</Title>
    <br/>
    <ProductDetail>
     {console.log(<img src={cart} alt=''/>)}
     {cart?.map((images)=>{
    return <Image src={images.favorite} alt='' />
     })
      }
    </ProductDetail>
    <NewsLetter/>
    <Footer/>
      
    </div>
  )
}

export default Favorite
