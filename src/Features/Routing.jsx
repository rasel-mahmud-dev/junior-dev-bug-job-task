import React from 'react';
import {Route, Routes} from 'react-router-dom';
import CheckoutPage from '../Pages/CheckoutPage';
import Join from "../Pages/Auth/Join";
import HomePage from "../Pages/HomePage";
import AddProduct from "../Pages/AddProduct";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/add-product" element={<AddProduct/>}/>
            <Route path="/checkout/:productId" element={<CheckoutPage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/join/:form" element={<Join/>}/>
        </Routes>
    );
}
