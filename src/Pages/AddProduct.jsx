import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";



import {toast} from "react-toastify";

import {Label} from "../Features/Checkout/Components/Handler";
import Input from "../Components/Share/Input";
import Btn from "../Components/Share/Btn";
import TextArea from "../Components/Share/TextArea";
import {useGlobalCtx} from "../Contexts/GlobalProvider";
import errorMessage from "../Utils/errorMessage";
import {apis} from "../apis/axios";

const AddProduct = () => {


    const {setAuth} = useGlobalCtx()

    const {register, handleSubmit, formState,  watch, setValue} = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            stock: 1,
            thumb: "",
        }
    })

    const thumb = watch("thumb", true)



    const {form} = useParams()
    const navigate = useNavigate()

    async function handleFormSubmit(formData) {

        try {
            let {status, data} = await apis.post("/api/products", {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                stock: formData.stock,
                thumb: formData.thumb,
            })

            if (status === 201) {
                // after successfully add product redirect to homepage
                // navigate("/")
            }
        } catch (ex) {
            // handle api error
            toast.error(errorMessage(ex))
        }
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 my-4">


            <h2 className="font-bold text-3xl text-center">Add Product</h2>


            <div className="space-y-2 relative">
                <Label title={"Title"} />
                <Input placeholder="Product title" className="" type="text" register={{ ...register('title') }} />

            </div>


            <div className="space-y-2 relative mt-6">
                <Label title={"Description"} />
                <TextArea placeholder="Description" className="rounded-3xl min-h-[100px]"  register={{ ...register('description') }} />

            </div>

            <div className="space-y-2 relative mt-6">
                <Label title={"Product Price"} />
                <Input placeholder="Price" className="" type="number" register={{ ...register('price') }} />

            </div>

            <div className="space-y-2 relative mt-6">
                <Label title={"Stock"} />
                <Input placeholder="Stock" className="" type="number" register={{ ...register('stock') }} />

            </div>

            <div className="mt-6">
                <label className="text-base text-black" htmlFor="">Thumb Link</label>

                <div className="space-y-2 relative mt-2">
                    <Input placeholder="Product image link" className=""  register={{ ...register('thumb') }} />
                </div>

                {thumb &&  <div
                     className={`  mt-2`}
                >
                    <img className="w-32 h-32 object-contain " src={thumb} alt="" />
                </div>
                }
            </div>

            <Btn type="submit" className="btn-primary mt-7 w-auto px-20">Add</Btn>

        </form>
    );
};

export default AddProduct;