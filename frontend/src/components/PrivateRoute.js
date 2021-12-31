import React from 'react';
import {Navigate, Route} from "react-router-dom";
import {useSelector} from "react-redux";

export default function PrivateRoute({children}) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    return userInfo ? children : <Navigate to="/signin"/>;
}