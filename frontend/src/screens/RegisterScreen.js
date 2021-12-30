import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {register} from "../actions/userActions";

export  default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userRegister = useSelector((state) => state.userSignin);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password and confirm password doesn\'t match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <div>
            {(userInfo) &&
            <Navigate replace to = "/"/>
            }
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create account</h1>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant = "danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"
                           placeholder="Enter name"
                           required onChange={e => setName(e.target.value)}>
                    </input>
                </div><div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email"
                           placeholder="Enter email"
                           required onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                           placeholder="Enter password"
                           required onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword"
                           placeholder="Enter confirm Password"
                           required onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? {' '}
                        <Link to="/signin">Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}