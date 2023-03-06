import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name:"user",
    initialState: {
        username: "",
        email: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
      },
      reducers: {
        signupStart: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.user.email;
            state.username = payload.user.name;
          },
          signupSuccess: (state) => {
            state.isFetching = true;
          },
          signupFailure: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
          }
      }})

      export const {signupStart,signupSuccess,signupFailure} =registerSlice.actions
      export default registerSlice.reducer;