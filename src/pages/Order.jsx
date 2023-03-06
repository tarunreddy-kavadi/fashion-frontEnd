import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Announcement from "../components/Announcment";
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import { Title } from './Cart';
import { userRequest } from '../requestMethods';
import { useState } from 'react';
import { TOKEN } from '../requestMethods';


const Container = styled.div``;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.div`
display: flex;
width:200px
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.h2`
display:flex;
font-weight: 200
`;

const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const Summary = styled.div`
  position: relative;

  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 30%;
  width:30%;
  margin-left:65%;
  margin-top:-20%
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;


const ProductSize = styled.span``;
const Order = ()=>{
    const user = useSelector((state)=> state.user.currentUser._id);
    const cart = useSelector((state)=> state.cart);
    const [order, setOrder] = useState([])
    useEffect(()=>{
        const getOrder = async()=>{
          try {
            const res = await userRequest.get('/orders/find/'+user,{
              headers:{token: `Bearer ${TOKEN}`},});
            setOrder(res.data)
          }catch{}
        }
        getOrder()
      },[])  
      console.log(order)
      // console.log(order.address[].addressNo)
      
    return(
        <Container> 
            <Announcement />
            <Navbar />
            <Title >YOUR ORDERS</Title>
            { order?.map((Order)=> 
            Order?.productDetails.map((details)=>
              <ProductDetail>
                  <Details>
                      <ProductName> {details.title} </ProductName>
                  <Image>
                    {<img src={details.img[0]} alt= 'productImage' style={{width:'200px', float: 'left',  padding: '5px',display:''}}/>}
                  </Image>
                    <ProductId>
                      <b>ID:</b> {details._id}
                      <br/> <br/>
                      <b>amount:</b> {details.price}
                      <br/> <br/>
                      <b>address:</b> {Order?.address.addressNo}, {Order?.address.city}, {Order?.address.postcode}
                    </ProductId>
                    <ProductColor color={Order?.color} />
                    <ProductSize>
                      <b>Size:</b> {details.size} 
                    </ProductSize>
                  </Details>
                  </ProductDetail>
                ))}
                 { order?.map((Order)=> 
                <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>£ {Order.amount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>£ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>£ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>£ {Order.amount}</SummaryItemPrice> 
              <br/>
              <SummaryItemText>Quantity:</SummaryItemText>
              <SummaryItemPrice>{Order.quantity}</SummaryItemPrice>
            </SummaryItem>
            </Summary>
            )}
            <Footer/>
        </Container>

    )}
export default  Order;
