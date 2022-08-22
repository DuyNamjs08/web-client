import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import CheckOut from '../pages/CheckOut';
import Contact from '../pages/Contact';
import ProductDetails from '../pages/ProductDetails';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProfileUser from '../pages/ProfileUser';
import { useSelector } from 'react-redux'


function Routers() {
    const { currentUser } = useSelector(state => state.ReducerCheckout)
    const RequireAuth = ({ children }) => {
        console.log("RequireAuth::", currentUser);
        return currentUser ? children : <Navigate to="/login" />;

    }
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='home' element={<Home />} />
            <Route path='product' element={<Products />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<RequireAuth><CheckOut /></RequireAuth>} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='contact' element={<Contact />} />
            <Route path='profile' element={<ProfileUser />} />

        </Routes>
    );
}

export default Routers;