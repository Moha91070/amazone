import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsreducer, productListReducer } from './reducers/productReducers';
import {cartReducer} from "./reducers/cartReducers";
import {
    userDetailsReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdaterProfileReducer
} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderMineListReducer,
    orderPaymentReducer
} from "./reducers/orderReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'Paypal'
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsreducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPaymentReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdaterProfileReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;