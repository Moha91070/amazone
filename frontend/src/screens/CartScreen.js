import React from "react";
import { useParams } from "react-router";
import { useLocation } from 'react-router-dom';

export default function CartScreen(props) {
    const location = useLocation();
    const { id } = useParams();
    const productId = id;
    const qty = location.search 
    ? Number(location.search.split('=')[1]) 
    : 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>ADD TO CART : Product ID: {productId} Qty: {qty} </p>
        </div>
    )
}