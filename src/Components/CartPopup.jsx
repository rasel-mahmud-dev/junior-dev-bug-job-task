import React from 'react';
import Btn from "./Share/Btn";
import {TiTimes} from "react-icons/ti";
import {useNavigate} from "react-router-dom";
import {apis} from "../apis/axios";
import {toast} from "react-toastify";
import errorMessage from "../Utils/errorMessage";

const CartPopup = ({setOpenCart, carts = [], setProductState}) => {

    const navigate = useNavigate();

    function handleBuyNow(cart){
        setOpenCart(false)
        if(!cart) return navigate("/checkout")

        navigate("/checkout/" + cart.productId)

    }

    function handleDelete(cart){
        apis.delete("/api/carts/"+cart.productId).then(({data, status})=>{
            if(status === 201){
                toast.success("Cart item delete success");
                // update our cart state
                setProductState({
                    carts: carts.filter(cp=>cp.productId !== cart.productId)
                })
            }
        }).catch(ex=>{
            toast.error(errorMessage(ex));
        })
    }


    return (
        <div className="absolute right-0 top-16 bg-white max-w-2xl w-full p-4 shadow-2xl">

            <TiTimes className="cursor-pointer absolute right-5 top-4" onClick={() => setOpenCart(false)}/>

            <table className="w-full mt-4">
                <thead>
                    <tr className="">
                        <td className="font-medium pb-4">Image</td>
                        <td className="font-medium pb-4">Title</td>
                        <td className="font-medium pb-4">Price</td>
                        <td className="font-medium pb-4">Quantity</td>
                        <td className="font-medium pb-4">Action</td>
                    </tr>
                </thead>
                <tbody>

                {carts.length === 0 && (
                    <div className="">
                        <h4 className="text-sm font-medium ">No Item added on Cart</h4>
                    </div>
                )}

                {carts.map((cart, index)=>(
                    <tr key={index}>
                        <td className="py-4">
                            <div className="w-12 h-12">
                                <img className="object-contain" src={cart.thumb} alt=""/>
                            </div>
                        </td>
                        <td>{cart.title}</td>
                        <td>{cart.price}</td>
                        <td>{cart.quantity || 1} Pics</td>
                        <td>
                            <div className="flex items-center gap-x-2">
                                <Btn  className="text-xs px-4" onClick={()=>handleBuyNow(cart)}>Buy Now</Btn>
                                <Btn  className="text-xs px-4" onClick={()=>handleDelete(cart)}>Delete</Btn>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {carts.length > 0 &&  <Btn onClick={()=>handleBuyNow("")} className="mt-4">Buy all</Btn> }


        </div>
    );
};

export default CartPopup;