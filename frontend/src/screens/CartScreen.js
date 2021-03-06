import React, {useEffect} from "react";
import {Link, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen() {
    const location = useLocation();
    const { id } = useParams();
    const productId = id;
    const qty = location.search 
    ? Number(location.search.split('=')[1])
    : 1;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    useEffect(() =>{
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id));
    };

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping cart</h1>
                {cartItems.length === 0
                ?<MessageBox>Cart is empty. <Link to="/">Go shopping</Link>
                </MessageBox>
                : (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small"/>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value)
                                                        ))
                                                }>
                                                {
                                                    [...Array(item.countInStock).keys()].map(
                                                        x => (
                                                            <option key={x + 1} value={x +1}>{x +1}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div>
                                           ${item.price}
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                </li>
                            ))
                        }
                    </ul>
                    )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <a href="/shipping">
                            <button type="button"
                                    className="primary block"
                                    disabled={cartItems.length === 0}
                            >
                                Proceed to checkout
                            </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}