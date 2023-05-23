import axios from "axios";
import {useEffect, useReducer, useState} from "react";
import countryCode from "../Features/Checkout/Data/countryCode.json";
import {apis} from "../apis/axios";

const useGlobal = () => {
    const [open, setOpen] = useState(false);
    const [mbCode, setMbCode] = useState(countryCode[15]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentErrorMessage, setPaymentErrorMessage]  = useState("")

    const [auth, setAuth] = useState()

    const [productState, setProductState] = useReducer(function (state, action){
        return {
            ...state,
            ...action,
        }
    }, {
        products: [],
        carts: []
    })

    useEffect(()=>{
        apis.get("/api/auth/verify").then(({status, data})=>{
            if(status === 201){
                setAuth(data)
            }
        }).catch(ex=>{})
    }, [])


    const toggleModal = () => setOpen(!open);

    const getPayment = async (body) => {

        // clear error message when press payment button
        setPaymentErrorMessage("")

        try {
            let {data, status} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bkash/createPayment`, {
                ...body,
                totalPrice
            });

            if(status !== 200) return setPaymentErrorMessage("Payment fail, Please try again.")

            // if successfully create payment agreement then redirect server to create agreement Execute
            const agreementExecuteLink = `${process.env.REACT_APP_SERVER_URL}/api/bkash/execute?email=${body.email}&totalPrice=${body.totalPrice}&paymentID=${data.paymentID}`
            window.location.href = agreementExecuteLink

        } catch (ex) {

            // handle show error message to client to better user experience.
            let errorMessage = ex.message;
            if(ex?.response && ex.response?.data && typeof ex.response.data === "string"){
                errorMessage = ex.response.data;
            }
            setPaymentErrorMessage(errorMessage)
        }
    }


    return {
        toggleModal,
        open,
        setMbCode,
        mbCode,
        auth,
        setAuth,
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
