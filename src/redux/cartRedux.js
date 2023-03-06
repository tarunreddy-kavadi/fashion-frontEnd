import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    favorites:[],
    quantity: 0,
    total: 0,
    address:{},
    city:{},
    postcode:{},
    
  },
  reducers: {

    allFavorite:(state,action) => { 
    state.favorites.push(action.payload)
    // push(action.payload)
},
    addressAll:(state,action) =>{
    state.address = action.payload;
    state.city = action.payload;
    state.postcode = action.payload
    },
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    emptyCart: (state) => {
        state.quantity = 0 ;
        state.products = [];
        state.total = 0;
        state.favorites =[]
        localStorage.removeItem("presist:root")
      },
      deleteCart(state,action) {
        const index= state.products.findIndex(product=>product._id === action.payload)
        state.quantity -=1;
        state.total -= state.products[index].price * state.products[index].quantity;
        state.products.splice(index,1)    
      },
      
      updateAmountProduct(state,action) {
        const id = action.payload.id;
        const type = action.payload.type;
        const index =state.products.findIndex(p=>p._id === id)
        const currentProduct = state.products[index];
        //Up
        if(type === "up"){
          currentProduct.quantity +=1;
          state.total += currentProduct.price;
        }
        //Down
        if(type === "down" && state.products[index].quantity > 1){
          currentProduct.quantity -=1;
          state.total -= state.products[index].price;
        }
        //update  amount
        if(type === "updateQuantity") {
          if(currentProduct.quantity > action.payload.quantity) {
            state.total -= (currentProduct.quantity - action.payload.quantity) * currentProduct.price;  
          }else{
            state.total += (action.payload.quantity - currentProduct.quantity) * currentProduct.price;
          }
          currentProduct.quantity = action.payload.quantity;
        }
      } 
  },
});

export const { addProduct,emptyCart, updateAmountProduct, deleteCart, addProductDatabase, addressAll,allFavorite} = cartSlice.actions;
export default cartSlice.reducer;