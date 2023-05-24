import React, {useEffect} from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TopHeader from './Components/TopHeader';
import Routing from './Features/Routing';
import axios from "axios";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useGlobalCtx} from "./Contexts/GlobalProvider";
import {apis} from "./apis/axios";

function App() {

    const {productState, setProductState, auth} = useGlobalCtx()

    useEffect(() => {
        axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
    }, [])


    useEffect(() => {
        if (auth) {
            apis.get("/api/carts").then(({data, status}) => {
                if (status === 200) {
                    setProductState({
                        carts: data
                    })
                }
            })
        }
    }, [auth])


    return (
        <div className="">

            <ToastContainer/>

            <div className="container ml-auto mr-auto px-4">
                <TopHeader/>
            </div>
            <Header/>
            <div className="container ml-auto mr-auto px-4">
                <Routing/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
