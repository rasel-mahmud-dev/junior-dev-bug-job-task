import React, {useState} from 'react';
import {Label} from "../Features/Checkout/Components/Handler";
import Input from "./Share/Input";
import Btn from "./Share/Btn";
import {Link} from "react-router-dom";

const Registration = ({register, onChangeImage}) => {

    const [avatar, setAvatar] = useState({blob: "", base64: ""})


    function handleChooseImage() {
        const input = document.createElement("input")
        input.type = "file"
        input.setAttribute("accept", "image/*")
        input.click()
        input.onchange = handleChangeImage
    }

    function handleChangeImage(e) {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.onload = function (e) {
            let base = e.target.result
            setAvatar({
                base64: base,
                blob: file
            })
            onChangeImage(file)
        }

        reader.onerror = function (e) {

        }

        reader.readAsDataURL(file)
    }

    return (
        <div>

            <h2 className="font-bold text-3xl text-center">Create Account</h2>
            <div className="border-primary border-b-4 mt-1 mb-6 w-2/4 mx-auto"></div>

            <div className="space-y-2 relative">
                <Label title={"First Name"} />
                <Input placeholder="First name" className="" type="text" register={{ ...register('firstName') }} />

            </div>


            <div className="space-y-2 relative mt-6">
                <Label title={"Last Name"} />
                <Input placeholder="Last name" className="" type="text" register={{ ...register('lastName') }} />

            </div>

            <div className="space-y-2 relative mt-6">
                <Label title={"Your Email"} />
                <Input placeholder="Email" className="" type="email" register={{ ...register('email') }} />

            </div>

            <div className="space-y-2 relative mt-6">
                <Label title={"Your Password"} />
                <Input placeholder="Your Password" className="" type="password" register={{ ...register('password') }} />

            </div>

            <div className="mt-6">
                <label className="text-base text-black" htmlFor="">Avatar</label>
                <div onClick={handleChooseImage}
                        className={`  mt-1 ${avatar?.base64 ? "!bg-transparent !shadow-xs" : ""}`}
                        >
                    <img className="w-32 h-32 object-contain rounded-full ring ring-primary" src={avatar?.base64} alt="" />
                </div>
            </div>


            <p className="text-sm font-medium mt-4 text-neutral-600">Already have an account?
                <Link className="text-blue-500 ml-1" to="/join/login">Login here</Link>
            </p>

            <Btn type="submit" className="btn-primary mt-7">Create</Btn>
        </div>
    );
};

export default Registration;