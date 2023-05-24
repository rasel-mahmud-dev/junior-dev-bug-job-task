import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form';
import {useGlobalCtx} from '../../../Contexts/GlobalProvider';
import Contact from './Contact'
import Order from './Order'
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {apis} from "../../../apis/axios";
import errorMessage from "../../../Utils/errorMessage";
import PaymentMd from "../../../Components/Modal/PaymentMd";


function Checkout() {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            phone: "01770618575",
            firstName: "Test user"
        }
    });

    const [useGetParams] = useSearchParams()

    const [orderDetail, setOrderDetail] = useState(null)



    const {productState, totalPrice, auth, setPaymentErrorMessage, paymentErrorMessage} = useGlobalCtx();

    const transactionId = useGetParams.get("transactionId")


    useEffect(()=>{

    // clear previous error message during payment
        setPaymentErrorMessage("")

        if(transactionId && auth){
            apis.get("/api/transactions/"+transactionId).then(({status, data})=>{
                if(status === 200 && data.status === "ok"){
                    setOrderDetail(data.data)
                }
            })
        }

    }, [transactionId, auth])



    const location = useLocation()


    const onSubmit = async (userInput) => {

            if (!auth) return toast.error("To create order and payment you need to login")

            // clear error message when press payment button
            setPaymentErrorMessage("")

            try {

                // create order and payment unpaid and store paymentID
                let {data, status} = await apis.post(`${process.env.REACT_APP_SERVER_URL}/api/bkash/createPayment`, {
                    ...userInput,
                    totalPrice,
                    items: productState.productsForOrder,
                    clientRedirect: location.pathname
                });

                if (status !== 201) return setPaymentErrorMessage("Payment fail, Please try again.")

                window.location.href = data.bkashURL

            } catch (ex) {

                // handle show error message to client to better user experience.
                setPaymentErrorMessage(errorMessage(ex))
            }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">

            {/*** Payment error message *****/}
            {paymentErrorMessage && (
                <div className="bg-red-400/20 py-4 px-4 rounded-lg">
                    <p className="text-red-500 font-medium text-sm text-center">{paymentErrorMessage}</p>
                </div>
            )}


            {/**** Payment create successful open modal */}
            {orderDetail ? <PaymentMd closeInfoModal={()=>setOrderDetail(null)} orderDetail={orderDetail}/> : ""}

            <div className="grid grid-cols-12 gap-x-8 pb-12 pt-4">

                <div className="col-span-7 ">
                    <Contact register={register}/>
                </div>
                <div className="col-span-5 ">
                    <Order/>
                </div>
            </div>
        </form>
    )
}

export default Checkout