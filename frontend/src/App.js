import React from 'react'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {useDispatch, useSelector} from "react-redux";
import SigninScreen from "./screens/SingninScreen";
import {signout} from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import {PlaceOrderScreen} from "./screens/PlaceOrderScreen";
import {OrderScreen} from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }

  return (
      <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazone
            </Link>
          </div>
          <div>
            <Link to="/cart/:id">Cart
              {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span> )}
            </Link>
            {(userInfo) ?
                (
                    <div className="dropdown">
                    <Link to="#">{userInfo.name} <i className="fa fa-caret-down"/> </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/orderhistory" >Order History</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </li>
                    </ul>
                    </div>)
                : (
                    <Link to="/signin">Sign In </Link>
                )}
          </div>
        </header>
        <main>
          <Routes>  
            <Route path="/cart/:id" element={<CartScreen/>}/>
            <Route path="/product/:id" element={<ProductScreen/>}/>
            <Route path="/signin" element={<SigninScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/shipping" element={<ShippingAddressScreen/>}/>
            <Route path="/payment" element={<PaymentMethodScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route path="/order/:id" element={<OrderScreen/>}/>
            <Route path="orderhistory" element={<OrderHistoryScreen/>}/>
            <Route exact path="/" element={<HomeScreen/>}/>
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
      </BrowserRouter>
  );
}

export default App;
