import React from 'react'
import {useForm} from 'react-hook-form';
import {useGlobalCtx} from '../../../Contexts/GlobalProvider';
import Contact from './Contact'
import Order from './Order'

function Checkout() {
    const {register, handleSubmit} = useForm();
    const {getPayment, paymentErrorMessage} = useGlobalCtx();

    const onSubmit = (data) => getPayment(data);


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