import React, {useEffect, useState} from 'react';
import PaymentMd from '../../../Components/Modal/PaymentMd';
import Btn from '../../../Components/Share/Btn'
import {useGlobalCtx} from '../../../Contexts/GlobalProvider';
import {TbRow} from './Handler'
import {useParams} from "react-router-dom";
import {apis} from "../../../apis/axios";



export default function Order() {
    const {open, productState: {carts = []}} = useGlobalCtx();

    const [singleProduct, setSingleProduct] = useState(null)

    const [totalPrice, setTotalPrice] = useState(0)

    const {productId} = useParams()


    useEffect(() => {

        if (productId) {
            apis.get("/api/products/" + productId).then(({status, data}) => {
                if (status === 200) {
                    setTotalPrice(data.price)
                    setSingleProduct(data)
                }
            })
        } else {
            let total = carts.reduce(
                (accumulator, currentValue) => Number(accumulator) + Number(currentValue.price),
                0
            );
            setTotalPrice(total)
        }

    }, [productId])


    return (
        <div>
            <div className="border border-border border-opacity-5 rounded-[0.5rem] py-4 px-5">
                <h1 className="text-textHeader text-xl pb-4 border-b">Your order</h1>
                <table className="w-full">
                    <tbody>
                    <tr className="border-b">
                        <td className="pt-5 pb-2 text-base font-semibold text-black">Product</td>
                        <td className="pt-5 pb-2 text-base font-semibold text-black text-right">Subtotal</td>
                    </tr>

                    {productId ? (
                        singleProduct && (
                            <> <TbRow key={singleProduct._id}
                                      label={singleProduct.title}>৳ {singleProduct.price} TK </TbRow>
                                <TbRow label="Subtotal"><p className="text-black">৳ {totalPrice}TK </p></TbRow></>
                        )
                    ) : (
                        <>
                            {carts.map((product) => <TbRow key={product._id}
                                                           label={product.title}>৳ {product.price} TK </TbRow>)}
                            <TbRow label="Subtotal"><p className="text-black">৳ {totalPrice}TK </p></TbRow>
                        </>
                    )}


                    </tbody>


                </table>
                <p className="py-5 text-pColor">Shipping</p>
                <div className="space-y-2 border-b border-border border-opacity-5 pb-5">
                    <div className="flex items-center justify-between text-pColor">
                        <label className="flex items-center">
                            <input type="radio" name="shipping" defaultChecked
                                   className="mr-2 accent-yellow-400 outline-none border-none" value="1"
                                   onChange={() => setTotalPrice((totalPrice - 2) + 1)}/>
                            Inside Dhaka
                        </label>
                        <p className="text-black">৳ 1.00tk </p>
                    </div>
                    <div className="flex items-center justify-between text-pColor">
                        <label className="flex items-center">
                            <input type="radio" name="shipping" className="mr-2 accent-yellow-400" value="2"
                                   onChange={() => setTotalPrice((totalPrice - 1) + 2)}/>
                            Outside Dhaka
                        </label>
                        <p className="text-black">৳ 2.00tk </p>
                    </div>
                </div>
                <div className="flex justify-between py-5">
                    <p className="text-black text-base font-normal">Estimated Total</p>
                    <p className="font-bold text-xl text-textHeader">৳ {totalPrice} TK </p>
                </div>
                <Btn type="submit">Continue to Payment</Btn>
                {open ? <PaymentMd/> : ""}
            </div>
        </div>
    )
}
