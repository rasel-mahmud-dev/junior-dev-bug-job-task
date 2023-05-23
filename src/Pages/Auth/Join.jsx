import React from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import Registration from "../../Components/Registration";
import Login from "./Login";
import {useGlobalCtx} from "../../Contexts/GlobalProvider";
import axios from "axios";

const Join = () => {

    const {setAuth} = useGlobalCtx()

    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: "", // for registration
            email: "test@gmail.com",
            password: "123",
        }
    })

    const {form} = useParams()

    async function handleFormSubmit(formData) {
        let url = form === "registration" ? "/login" : "/registration"

        try {
            let {status, data} = await axios.post("/api/auth/" + url,  formData)
            if (status === 201) {
                localStorage.setItem("token", data.token)
                setAuth(data.auth)
            }
        } catch (ex) {
            // handle api error
        }
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-xl mx-auto shadow-2xl rounded-xl p-6 my-20">

            {form === "new"
                ? <Registration register={register}/>
                : <Login register={register}/>
            }

        </form>
    );
};

export default Join;