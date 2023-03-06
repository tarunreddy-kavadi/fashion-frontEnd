import { createSlice } from "@reduxjs/toolkit";
const users = createSlice({
    name: "produts",
    initialState: {
      products: [{title:"men"},{title:"pant"}],
      filteredProducts: [{title:"men"},{title:"pant"}],
      isLoading: true,
      search: ""
    },
    reducers: {
      usersSuccess: (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        return {
          users: action.payload,
          filteredProducts: [...action.payload],
          isLoading: false
        };
      },
      searchByName: (state, action) => {
        const filteredProducts = state.products.filter((user) =>
          user.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          filteredProducts:
            action.payload.length > 0 ? filteredProducts : [...state.products]
        };
      }
    }
  });
  export const userActions = users.actions
