import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {Link, useParams} from "react-router-dom";
import {detailsProduct} from "../actions/productActions";

export default function ProductScreen(props){
    const { id } = useParams();
    const dispatch = useDispatch();
    const productId = id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    console.log(product)
    
    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    return (
        <div>
        {loading ? <LoadingBox/>
        : error ? <MessageBox variant="danger">{error}</MessageBox>
        :( 
            <div>
            <Link to="/">Retour</Link>
            <div className="row top">
                <div className="col-2 " style={{ width: "80%" }}>
                    <img className="largeProduct" src={product.product.image} alt={product.product.name}/>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                    <ul>
                        <li>
                            <h1>{product.product.name}</h1>
                        </li>
                        <li>
                            <Rating 
                                rating={product.product.rating}
                                numReviews={product.product.numReviews}
                            />
                        </li>
                        <li>Price: {product.product.price}</li>
                        <li>Description:
                            <p>{product.product.description}</p>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>{product.product.countInStock > 0?<span className="success">En stock</span>:
                                    <span className="danger">Rupture de stock</span>}</div>
                                </div>
                            </li>
                            {
                                product.product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.product.countInStock).keys()].map(
                                                            x => (
                                                            <option key={x + 1} value={x +1}>{x +1}</option>
                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a href={`/cart/${productId}?qty=${qty}`}>
                                            <button className="primary block">
                                                Ajouter au panier                                            
                                            </button>
                                        </a>
                                    </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )}
      </div>
   
    )
}   