import axios from "axios";
import {useEffect, useReducer, useState} from "react";
import countryCode from "../Features/Checkout/Data/countryCode.json";
import {apis} from "../apis/axios";
import errorMessage from "../Utils/errorMessage";
import {toast} from "react-toastify";

const useGlobal = () => {
    const [open, setOpen] = useState(false);
    const [mbCode, setMbCode] = useState(countryCode[15]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentErrorMessage, setPaymentErrorMessage] = useState("")


    const [auth, setAuth] = useState(null)
    const [isAuthLoaded, setAuthLoaded] = useState(false)


    const [productState, setProductState] = useReducer(function (state, action) {
        return {
            ...state,
            ...action,
        }
    }, {
        products: [],
        carts: [],
        productsForOrder: []
    })

    // auth load
    useEffect(() => {
        apis.get("/api/auth/verify").then(({status, data}) => {
            if (status === 201) {
                handleLogin(data)
            } else {
                handleLogin(null)
            }
        }).catch(ex => {
            handleLogin(null)
        })
    }, [])


    function handleLogin(auth) {
        setAuth(auth)
        setAuthLoaded(true)
        if(!auth){
            // clear current user cart items for
            setProductState({carts: []})
        }
    }

    const toggleModal = () => setOpen(!open);



    return {
        toggleModal,
        open,
        setMbCode,
        mbCode,
        auth,
        isAuthLoaded,
        handleLogin,
        productState,
        setProductState,
        totalPrice,
        paymentErrorMessage,
        setPaymentErrorMessage,
        setTotalPrice,
    };
};
export default useGlobal;
