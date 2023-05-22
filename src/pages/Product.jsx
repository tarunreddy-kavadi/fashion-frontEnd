import Announcement from "../components/Announcment";
import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, ArrowLeft, ArrowRight, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest, TOKEN, userRequest } from "../requestMethods";
import { useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "../components/ToastElements";
import { ToastText } from "../components/ToastElements";
import { useSelector } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px 0px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
  ${mobile({ padding: "50px" })}
  img {
    position: absolute;
    margin: auto;
    top: -145px;
    right: 0;
    bottom: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;

    animation: slideshow 10s linear infinite;
    &:hover {
      transform: scale(1.5);
    }
    ${mobile({
      top: "10px",
      padding: "15px",
      position: "absolute",
      marginLeft: "85px",
    })}
  }
`;

const NavButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 5px;
  border-radius: 500px;
  border: none;
  background: rgba(255, 255, 255, 0.7);

  ${mobile({ position: "sticky", margin: "50px 150px -80px 0px" })}

  ${({ position }) => position === "left" && `left: 10px;`}
  ${({ position }) => position === "right" && `right: 10px;`}
`;
const ThumbnailList = styled.div`
  display: flex;
  align: flex;
  width: 100%;
  height: 30%;
`;
const Thumbnail = styled.div`
  cursor: pointer;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  flex-grow: 1;
  :hover {
    opacity: 1;
  }
  ${mobile({ flexDirection: "column", display: "flex" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-||: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-||: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-||: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
padding:15px;
border:2px solid teal;
background-color: white;
cursor:pointer;
font-weight:500;
margin-top: -30px

&:hover{
    background-color:#f8f4f4;
}
`;

const Product = () => {
  const location = useLocation();
  // useLocation captures the webpage location in the website Ex: Product page is in Fashion website.
  const id = location.pathname.split("/")[2];
  // pathname.split("/")[2] means the webpage pathname EX:localhost:3000/user/635ea4b1a7b1587e91a427e4 this is pathname and split it and take 2nd in the array so it takes "id".
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [{ activeIndex }, setState] = useState({
    activeIndex: 0,
  });
  const [toast, setToast] = useState({
    text: "",
    status: false,
    bg: "",
  });
  const dispatch = useDispatch();
  const images = product.img;
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser._id);
  //UseEffect for Toast
  useEffect(() => {
    let myTimeout;
    if (toast.status) {
      myTimeout = setTimeout(() => {
        setToast({
          ...toast,
          status: false,
        });
      }, 1000);
    }
    return () => clearTimeout(myTimeout);
  }, [toast]);
  //UseEffect to getProduct
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 0 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClick = () => {
    if (quantity && size) {
      dispatch(addProduct({ ...product, quantity, color, size }));
      setToast({
        text: "successfully Added to Cart",
        status: true,
        bg: "green",
      });
    } else {
      setToast({
        text: "Please add the Quantity and Size",
        status: true,
        bg: "red",
      });
    }
    //although the cart 'handleClick' is storing the product,quantity,color,size. but i want to send into DB
    //so that user can get his cart information when they sing in again after a while. where storing in redux temporary and will be errased a
    // as soon we refresh the page in our case we use presist that is totally different topic.
    const postCart = async () => {
      try {
        const res = await userRequest.post("/carts", {
          headers: { token: `Bearer ${TOKEN}` },
          UserId: user,
          products: [
            { productId: cart.products._id },
            { quantity: cart.quantity },
          ],
        });
        console.log(res.data);
      } catch {}
    };
    postCart();
  };
  const moveTo = (newIndex) => () => {
    if (newIndex === -1) {
      setState((s) => ({ ...s, activeIndex: images?.length - 1 }));
      return;
    }
    if (newIndex === images?.length) {
      setState((s) => ({ ...s, activeIndex: 0 }));
      return;
    }
    setState((s) => ({ ...s, activeIndex: newIndex }));
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <ToastContainer bg={toast.bg}>
        <ToastText>{toast.text}</ToastText>
      </ToastContainer>
      <Wrapper>
        <ImageContainer>
          <ImageBox>
            <img src={images?.[activeIndex]} />
            {/* <img  src={images?.[activeIndex]}  alt={`productImage`} /> */}
            <NavButton position="left" onClick={moveTo(activeIndex - 1)}>
              <ArrowLeft />
            </NavButton>
            <NavButton position="right" onClick={moveTo(activeIndex + 1)}>
              <ArrowRight />
            </NavButton>
          </ImageBox>
          <ThumbnailList>
            {images?.map((item, index) => (
              <Thumbnail
                active={activeIndex === index}
                src={item}
                onClick={moveTo(index)}
              />
            ))}
          </ThumbnailList>
        </ImageContainer>
        <br />
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>£ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
              <FilterColor color="black" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
          </AddContainer>
          <br />
          <Button onClick={handleClick}> ADD TO CART</Button>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};
export default Product;
