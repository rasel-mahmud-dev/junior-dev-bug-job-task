import React from 'react';
import {Route, Routes} from 'react-router-dom';
import CheckoutPage from '../Pages/CheckoutPage';
import Join from "../Pages/Auth/Join";
import HomePage from "../Pages/HomePage";
import AddProduct from "../Pages/AddProduct";
import PrivateRoute from "../Middleware/PrivateRoute";
import Orders from "../Pages/Orders";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/add-product" element={<PrivateRoute><AddProduct/></PrivateRoute>}/>
            <Route path="/checkout/:productId" element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
            <Route path="/checkout" element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
            <Route path="/join/:form" element={<Join/>}/>
            <Route path="/orders" element={<PrivateRoute><Orders/></PrivateRoute>}/>
        </Routes>
    );
}
