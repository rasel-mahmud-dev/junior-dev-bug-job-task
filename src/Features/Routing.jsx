import React from 'react';
import {Route, Routes} from 'react-router-dom';
import CheckoutPage from '../Pages/CheckoutPage';
import Join from "../Pages/Auth/Join";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<CheckoutPage/>}/>
            <Route path="/join/:form" element={<Join/>}/>
        </Routes>
    );
}
