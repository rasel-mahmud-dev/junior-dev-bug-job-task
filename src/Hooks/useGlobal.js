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
        carts: []
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

    const getPayment = async (body, pathname) => {


        if (!auth) return toast.error("To create order and payment you need to login")

        // clear error message when press payment button
        setPaymentErrorMessage("")

        try {
            let {data, status} = await apis.post(`${process.env.REACT_APP_SERVER_URL}/api/bkash/createPayment`, {
                ...body,
                totalPrice
            });

            if (status !== 200) return setPaymentErrorMessage("Payment fail, Please try again.")


            // if successfully create payment agreement then redirect server to create agreement Execute
            let agreementExecuteLink = `${process.env.REACT_APP_SERVER_URL}/api/bkash/execute?email=${body.email}&totalPrice=${totalPrice}&paymentID=${data.paymentID}`

            let clientRedirect = '&clientRedirect=' + pathname
            agreementExecuteLink += clientRedirect;

            // hit backend server to Execute Agreement.
            window.location.href = agreementExecuteLink


        } catch (ex) {

            // handle show error message to client to better user experience.
            setPaymentErrorMessage(errorMessage(ex))
        }
    }


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
        getPayment,
        totalPrice,
        paymentErrorMessage,
        setPaymentErrorMessage,
        setTotalPrice,
    };
};
export default useGlobal;
