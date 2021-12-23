import React, {useState} from 'react';
import CheckoutSteps from "../components/CheckoutSteps";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions";

export default function ShippingAddressScreen() {
    const cart = useSelector(state => state.cart);
    const{shippingAddress} = cart;
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const userRegister = useSelector((state) => state.userSignin);
    const {userInfo} = userRegister;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        navigate("/payment");
    }

    return (
        <div>
            {(!userInfo) &&
            <Navigate replace to="/signin"/>
            }
            <CheckoutSteps step1 step2/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter your full name"
                           value={fullName} onChange={(e) => setFullName(e.target.value)} require/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter your address"
                           value={address} onChange={(e) => setAddress(e.target.value)} require/>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter your city"
                           value={city} onChange={(e) => setCity(e.target.value)} require/>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter your postal code"
                           value={postalCode} onChange={(e) => setPostalCode(e.target.value)} require/>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter your country"
                           value={country} onChange={(e) => setCountry(e.target.value)} require/>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}