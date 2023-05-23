import React from 'react';
import {Label} from "../Features/Checkout/Components/Handler";
import Input from "./Share/Input";
import Btn from "./Share/Btn";
import {Link} from "react-router-dom";

const Registration = ({register}) => {
    return (
        <div>

            <h2 className="font-bold text-3xl text-center">Create Account</h2>
            <div className="border-primary border-b-4 mt-1 mb-6 w-2/4 mx-auto"></div>

            <div className="space-y-2 relative">
                <Label title={"Your Name"} />
                <Input placeholder="Name" className="" type="text" register={{ ...register('name') }} />

            </div>

            <div className="space-y-2 relative">
                <Label title={"Your Email"} />
                <Input placeholder="Email" className="" type="email" register={{ ...register('email') }} />

            </div>

            <div className="space-y-2 relative mt-6">
                <Label title={"Your Password"} />
                <Input placeholder="Your Password" className="" type="password" register={{ ...register('password') }} />

            </div>


            <p className="text-sm font-medium mt-4 text-neutral-600">Already have an account?
                <Link className="text-blue-500 ml-1" to="/join/login">Login here</Link>
            </p>

            <Btn type="submit" className="btn-primary mt-7">Create</Btn>
        </div>
    );
};

export default Registration;