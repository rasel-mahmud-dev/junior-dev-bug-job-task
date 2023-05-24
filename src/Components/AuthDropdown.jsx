import React from 'react';
import Btn from "./Share/Btn";
import {Link} from "react-router-dom";
import {useGlobalCtx} from "../Contexts/GlobalProvider";

const AuthDropdown = ({onMouseLeave}) => {
    const {setAuth} = useGlobalCtx()
    function handleLogout(){
        localStorage.removeItem("token")
        setAuth(null)
    }
    return (
        <div className="absolute w-40 shadow-xl right-0 top-9 bg-white p-4 rounded-xl"  onMouseLeave={onMouseLeave} >
            <li className="hover:text-blue-500 list-none cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-blue-500 list-none cursor-pointer">Profile</li>
            <li className="hover:text-blue-500 list-none cursor-pointer" onClick={handleLogout}>Logout</li>
        </div>
    );
};

export default AuthDropdown;