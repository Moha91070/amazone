import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";
import {CART_EMPTY} from "../constants/cartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.post('api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch (e) {
        dispatch({type: ORDER_CREATE_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin: {userInfo}} = getState();
    const {id} = orderId;
    try {
        const {data} = await axios.get(`/api/orders/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch (e) {
        const message = e.response && e.response.data.message
            ? e.response.data.message
            : e.message;
        dispatch({type: ORDER_DETAILS_FAIL, payload: message});
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({type: ORDER_PAYMENT_REQUEST, payload: {order, paymentResult}});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({type: ORDER_PAYMENT_SUCCESS, payload: data})
    } catch (e) {
        const message = e.response && e.response.data.message
            ? e.response.data.message
            : e.message;
        dispatch({type: ORDER_PAYMENT_FAIL, payload: message});
    }

}