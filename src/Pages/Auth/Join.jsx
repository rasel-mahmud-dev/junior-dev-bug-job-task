import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import Registration from "../../Components/Registration";
import Login from "../../Components/Login";
import {useGlobalCtx} from "../../Contexts/GlobalProvider";
import axios from "axios";
import {apis} from "../../apis/axios";

const Join = () => {


    const {setAuth} = useGlobalCtx()

    const {register, handleSubmit, formState, setValue} = useForm({
        defaultValues: {
            firstName: "", // for registration
            lastName: "", // for registration
            email: "test@gmail.com",
            password: "123",
        }
    })
    const [avatar, setAvatar] = useState(null)

    const {form} = useParams()

    async function handleFormSubmit(formData) {
        let url = "/login"

        let payload = formData;


        if(form === "new"){
            url = "/register"
            payload = new FormData()
            payload.append("firstName", formData.firstName)
            payload.append("lastName", formData.lastName)
            payload.append("email", formData.email)
            payload.append("password", formData.password)
            if(avatar){
                payload.append("avatar", avatar, "avatar")
            }
        }


        try {
            let {status, data} = await apis.post("/api/auth" + url,  payload)
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
                ? <Registration register={register} onChangeImage={(blob)=>setAvatar(blob)}/>
                : <Login register={register}/>
            }

        </form>
    );
};

export default Join;