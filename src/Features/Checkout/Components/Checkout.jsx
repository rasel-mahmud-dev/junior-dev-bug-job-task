import React from 'react'
import {useForm} from 'react-hook-form';
import {useGlobalCtx} from '../../../Contexts/GlobalProvider';
import Contact from './Contact'
import Order from './Order'
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {apis} from "../../../apis/axios";
import errorMessage from "../../../Utils/errorMessage";


function Checkout() {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            phone: "01770618575",
            firstName: "Test user"
        }
    });
    const {productState, totalPrice, auth, setPaymentErrorMessage, paymentErrorMessage} = useGlobalCtx();

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
                    redirectClient: location.pathname
                });

                if (status !== 201) return setPaymentErrorMessage("Payment fail, Please try again.")

                window.location.href = data.bkashURL

                // if successfully create payment agreement then redirect server to create agreement Execute
                // let agreementExecuteLink = `${process.env.REACT_APP_SERVER_URL}/api/bkash/execute?email=${body.email}&totalPrice=${totalPrice}&paymentID=${data.paymentID}`
                //
                // let clientRedirect = '&clientRedirect=' + pathname
                // agreementExecuteLink += clientRedirect;

                // hit backend server to Execute Agreement.
                // window.location.href = agreementExecuteLink


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