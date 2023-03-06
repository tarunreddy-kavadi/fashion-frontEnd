
import { Add, Delete, Remove, Close, FavoriteBorderOutlined, LocalShipping, ShoppingBasketOutlined, ShoppingBasketRounded, ShoppingBasket } from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest, verify } from "../requestMethods";
import { useNavigate} from "react-router";
import { Link,Navigate } from "react-router-dom";
import { updateAmountProduct, deleteCart,addressAll} from "../redux/cartRedux";
import {Popup} from "reactjs-popup";
import { AddressAutofill } from '@mapbox/search-js-react';
import { TOKEN } from "../requestMethods";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Pointer =styled.div`
cursor:pointer;
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
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

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor:pointer
`;
const Modal = styled.div`
position: fixed;
background: #00000050;
width: 100%;
height: 100vh;
top: 0;
left: 0;

`;
const Content = styled.div`
position: fixed;
width: 100%;
margin: 0 auto;
height: 100%;
max-height: 100vh;
margin-top: 300px;
background: white;
color: white;
border-radius: 4px;
padding: 20px;
border: 1px solid #999;
overflow: auto;
`;
const PopupButton = styled.span`
position: relative;
margin-left: 98%;
top:-410px;
padding: 10px;
color:black;
cursor:pointer;
`;
const Form = styled.div`
postion:absolute;
flex-direction:column;
padding:10px;
margin-left:35%;
`;
const AddressButton = styled.button`
position: relative;
margin-left: 50%;
top:-30px;
padding: 10px;
color:black;
cursor:pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser._id);  
  const user = useSelector((state)=> state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const[quantity,setQuantity] = useState(0);
  const[addressNo,setAddressNo] = useState("");
  const[Apartment,setApartment] = useState("");
  const[city,setCity] = useState("");
  const[state,setState] = useState("");
  const[country,setCountry] = useState("");
  const[postcode,setPostcode] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const emptycart = cart.quantity === 0 ? <Navigate to = "/"/>:"";

  const onToken = (token) => {
    setStripeToken(token);
  };
  const handleClose = () => {
    setShow(false)
    console.log('clicked')
  };
  // const handleShow = () => setShow(true);
  // as soon as the user  sign in the user account will be authenticated and authorized to pop the particular user information like.
  // the authentiation and authorization will in back-end.
    useEffect(()=>{
    const getCart = async()=>{
      try {
        const res = await userRequest.get(`/carts/find/`+currentUser,{  
          headers:{token: `Bearer ${TOKEN}`},
        });
      console.log ([res.data])
      }catch{}
    }
    getCart()
  },[currentUser])
  console.log(currentUser)
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total*100,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart});
      } catch {
        navigate("/cancel")
      }
    };
    stripeToken && cart.total >=1 && makeRequest();
  }, [stripeToken, cart.total, navigate]); 

  const handleQuantity = (id,type) =>{
    dispatch(updateAmountProduct({type,id,quantity: Math.floor(quantity)}))
  };

    const handleMouseLeave =()=>{
      if(typeof quantity === 'string'){
        if(quantity === '' || quantity === '1'){
         setQuantity(quantity-1)
        }
        else{
          setQuantity(Number(quantity))
        }
      }
    }
    const handleDeleteCart = id =>{
      dispatch(deleteCart(id));
    }

    // This API handling to Post the Orders in the DataBase
    const postOrder = async()=>{
      try {
        const res = await userRequest.post("/orders",{
        headers:{token: `Bearer ${TOKEN}`},
        userId:user.currentUser._id,
        productDetails:cart.products,
        quantity:cart.quantity,
        amount: cart.total,
        address:cart.address
        })
        console.log(res.data)
      } catch{console.log(Error)}      
      }
      
      const addressHandle =()=>{
       dispatch(addressAll({addressNo,city,postcode}))
      }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
        <Link to="/"> <TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <Badge badgeContent={cart.quantity} color="secondary" style={{padding:'7px',left:' 30px',marginTop:'-25px', color:'#DC143C'}}/>
            <ShoppingBasket style={{padding:'-20px', height:'30px', width:'30px', marginTop:'-15px'}}/>
            <Link to = "/favorite" style={{color:"black", textDecoration: 'none', padding:'20px'}}> <FavoriteBorderOutlined style={{height:'30px', width:'30px',color:'#FF1493'}}/></Link>
           <Link to = "/order" style={{color:"black",textDecoration: 'none', padding:'5px' }}> <LocalShipping style={{height:'30px', width:'30px'}}/> </Link>
           {emptycart} 
           

          </TopTexts>
          
           <Popup 
           trigger={<TopButton type="filled" >CHECKOUT NOW</TopButton>}
           position = "center"
           show = {show} 
          onHide={handleClose}>
            {close =>(
            <div>
            <Modal>
              <Content>
                <Title style={{color:"black",background:"White",width:"33%",marginLeft:"35%"}}><b>ADDRESS</b></Title>
              <form>
                <Form>
            <AddressAutofill accessToken="my-access-token-here">
                <input style={{width:"50%", height:"40px", backgroundColor:"#f1f1f1"}}
                    name="address" placeholder="Address" type="text"
                    autoComplete="address-line1" onChange={(e)=>setAddressNo(e.target.value)}
                />
            </AddressAutofill>
            </Form>
            <Form>
            <input style={{width:"50%", height:"40px", backgroundColor:"#f1f1f1"}}
                name="apartment" placeholder="Apartment number" type="text"
                autoComplete="address-line2" onChange={(e)=>setApartment(e.target.value)}
            />
            </Form>
            <Form>
            <input style={{width:"50%", height:"40px", backgroundColor:"#f1f1f1" }}
                name="city" placeholder="City" type="text"
                autoComplete="address-level2" onChange={(e)=>setCity(e.target.value)}
            />
            </Form>
            <Form>
            <input style={{width:"50%", height:"40px", backgroundColor:"#f1f1f1"}}
                name="state" placeholder="State" type="text"
                autoComplete="address-level1" onChange={(e)=>setState(e.target.value)}
            />
            </Form>
            <Form>
            <input style={{width:"50%", height:"40px", backgroundColor:"#f1f1f1"}}
                name="country" placeholder="Country" type="text"
                autoComplete="country" onChange={(e)=>setCountry(e.target.value)}
            />
            </Form>
            <Form>
            <input style={{width:"50%", height:"40px", backgroundColor:"#f1f1f1"}}
                name="postcode" placeholder="Postcode" type="text"
                autoComplete="postal-code" onChange={(e)=>setPostcode(e.target.value)}
            />
            </Form>
        </form>
        <PopupButton onClick={close} style={{color:'teal'}}><Close/></PopupButton>
        <AddressButton  onClick={addressHandle} style={{color:'teal'}}>Submit</AddressButton>
              </Content>
            </Modal>
            </div>
            )} 
         </Popup>
          
        </Top>
        <Bottom>
          <Info>
          {cart.products.map((product) => (
              <Product>
                <Pointer><Delete onClick={()=>handleDeleteCart(product._id)}/></Pointer>
                <ProductDetail>
                  <Image src = {product.img[0]} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                 <Pointer> <Add onClick={()=> handleQuantity(product._id,"up")}/></Pointer>
                  <ProductAmount
                  value= {product.quantity}
                  name = ""
                   type= "number"
                 onChange = {(e) => setQuantity(e.target.value)}
                 onMouseDown={()=>handleMouseLeave()}
                onMouseLeave={()=>handleMouseLeave()} 
              > {product.quantity}</ProductAmount>
                    <Pointer><Remove onClick={()=>handleQuantity(product._id,"down")}/></Pointer>
                  </ProductAmountContainer>
                  <ProductPrice>
                    £ {+(Math.round(product.quantity * product.price + 'e+2')+'e-2')}
                  </ProductPrice>
                </PriceDetail>
              </Product>
                  ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>£ {cart.total}</SummaryItemPrice>
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
              <SummaryItemPrice>£ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Fashion."
              image=""
              billingAddress
              shippingAddress
              description={`Your total is £${cart.total}`}
              currency='GBP'
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button onClick={postOrder}>CHECKOUT NOW</Button>
            </StripeCheckout> 
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
          }
;

export default Cart;