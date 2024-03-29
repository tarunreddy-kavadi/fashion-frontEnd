import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { signupStart, signupSuccess, signupFailure } from "./registerRedux";
import { publicRequest} from "../requestMethods";

// import { searchProductFailure, searchProductStart, searchProductSuccess } from "./searchRedux";
// here dispatch and user is coming from login page and user is props we can write as user or props. same goes with register
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(signupSuccess(res.data));
  } catch (err){
    dispatch(signupFailure());
  }
};

// export const postingProductDB = async(dispatch) => {
//   try{
//     const res = await userRequest.post("/carts",)
//   dispatch(addProductDatabase(res.data));
//   }catch{}
// }

// export const search = async (id, dispatch) => {
//   dispatch(searchProductStart());
//   try {
//     const res = await publicRequest.get(`products/${id}`);
//    dispatch(searchProductSuccess(res.data));
//   } catch (err){
//     dispatch(searchProductFailure());
//   }
// }

