import React, {useState} from 'react';
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {savePaymentMethod} from "../actions/cartActions";


export default function PaymentMethodScreen() {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!shippingAddress.address){
        navigate('/shipping');
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder");
    }
    return (
        <div>
            {(!shippingAddress.address) &&
            <Navigate replace to='/shipping'/>
            }
            <CheckoutSteps step1 step2 step3/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                <div>
                    <input type="radio" id="paypal" value="Paypal" name="paymentMethod" required checked
                           onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paypal"> PayPal</label>
                </div>
                </div>
                <div>
                <div>
                    <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required
                           onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="stripe"> Stripe</label>
                </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>

    )
}