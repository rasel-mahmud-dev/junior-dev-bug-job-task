import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import Registration from "../../Components/Registration";
import Login from "../../Components/Login";
import {useGlobalCtx} from "../../Contexts/GlobalProvider";
import {apis} from "../../apis/axios";
import {toast} from "react-toastify";
import errorMessage from "../../Utils/errorMessage";

const Join = () => {


    const {handleLogin} = useGlobalCtx()

    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            firstName: "", // for registration
            lastName: "", // for registration
            email: "test@gmail.com",
            password: "123",
            avatar: "",
        }
    })


    const {form} = useParams()
    const navigate = useNavigate()

    const avatar = watch("avatar")

    async function handleFormSubmit(formData) {
        let url = "/login"

        let payload = {};


        if(form === "new"){
            url = "/register"
            payload["firstName"] =  formData.firstName
            payload["lastName"] =  formData.lastName
            payload["email"] =  formData.email
            payload["password"] =  formData.password
            payload["avatar"] =  formData.avatar
        } else {
            payload["email"] =  formData.email
            payload["password"] =  formData.password
        }


        try {
            let {status, data} = await apis.post("/api/auth" + url,  payload)
            if (status === 201) {
                localStorage.setItem("token", data.token)
                handleLogin(data.auth)

                // after successfully login or registration redirect to homepage
                navigate("/")
            }
        } catch (ex) {
            // handle api error

            toast.error(errorMessage(ex))
        }
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-xl mx-auto shadow-2xl rounded-xl p-6 my-20">

            {form === "new"
                ? <Registration register={register} avatar={avatar}/>
                : <Login register={register}/>
            }

        </form>
    );
};

export default Join;