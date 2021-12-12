import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";
import axios from 'axios';

export const addToCart = (productId, qty) =>async(dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${productId}`);
    console.log(data.product);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            product: data.product._id,
            qty,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}