import React from 'react';
import {Link} from "react-router-dom";
import {useGlobalCtx} from "../Contexts/GlobalProvider";

const AuthDropdown = ({onMouseLeave, auth}) => {
    const {handleLogin} = useGlobalCtx()

    function handleLogout() {
        localStorage.removeItem("token")
        handleLogin(null)
    }

    return (
        <div className="absolute w-40 shadow-xl right-0 top-9 bg-white p-4 rounded-xl" onMouseLeave={onMouseLeave}>
            <div className="font-semibold mb-3">
                <h4>{auth.firstName} {auth?.lastName}</h4>
                <h5 className="text-sm">{auth.email}</h5>
            </div>
            <li className="hover:text-blue-500 list-none cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-blue-500 list-none cursor-pointer">Profile</li>
            <li className="hover:text-blue-500 list-none cursor-pointer" onClick={handleLogout}>Logout</li>
        </div>
    );
};

export default AuthDropdown;