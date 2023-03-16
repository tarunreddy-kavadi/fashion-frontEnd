import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
   Route, 
   Routes,
   Navigate
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { Cancel } from "@material-ui/icons";
import Products from "./components/Products";
import Order from "./pages/Order";
import Favorite from "./pages/Favorite"


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const ProtectedRoute = ({ user, children }) => {
    //children : cart 
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  return (
    <Router>
     <Routes>
    
     <Route exact path="/" element={<Home />} />
     <Route path="/products/:category" element={<ProductList />} />
     <Route path= "/favorite" element={<Favorite/>} />
     <Route path="/product/:id" element={<Product />} />
     <Route
          path="cart"
          element={
     <ProtectedRoute user={user}> 
     <Cart /> 
      </ProtectedRoute>
          } />
     <Route path="/order" element={<Order />}/>
     <Route path="/login" element= {user ? <Login style={{display:'none'}}/> : <Login/>}/>
     <Route path="/register" element={user ?<Register style={{display:'none'}}/> : <Register/>} />
    <Route path ="/success" placeholder="search..." data={Products}element={<Success/>}/>
    <Route path ="/cancel" element={<Cancel/>}/>
    <Route path ="/checkout" element={user ? <Navigate to = "/checkout/payment"/> : <Login/>}/>
     </Routes>
  </Router>
  );      
};

export default App;















// import Home from "./pages/Home"
// import ProductList from "./pages/ProductList";
// import Product from "./pages/Product";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Cart from "./pages/Cart";
// import {
//   BrowserRouter as Router,
//   Route, 
//   Routes,
//   Navigate
// } from "react-router-dom";
// import Success from "./pages/Success";
// import { useSelector } from "react-redux";

// const App = () => {
//   const user = useSelector((state)=>state.user.currentUser)
//   return (
//     <Router>
//     <Routes>
//     <Route exact path="/" element={<Home />} />
//     <Route path="/products/:category" element={<ProductList />} />
//     <Route path="/product/:id" element={<Product />} />
//     <Route path="/cart" element={<Cart />} />
//     <Route path="/login" element= {user ? <Navigate to ="/"/> : <Login/>}/>
//     <Route path="/register" element={user ?<Navigate to = "/" /> : <Register/>} />
//     <Route path ="/success" element={<Success/>}/>
//     </Routes>
//   </Router>
 
//   )
// };

// export default App;