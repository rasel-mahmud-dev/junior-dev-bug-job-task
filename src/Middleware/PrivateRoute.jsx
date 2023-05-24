import React from 'react';
import {useGlobalCtx} from "../Contexts/GlobalProvider";
import {MoonLoader} from "react-spinners";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {


    const {isAuthLoaded, auth} = useGlobalCtx()

    if (!isAuthLoaded) return (
        <div className="py-24 w-full flex justify-center  items-center flex-col">
            <MoonLoader/>
            <h4 className="text-xs font-semibold mt-2">Auth Loading...</h4>
        </div>
    )

    if (isAuthLoaded && !auth) {
        return <Navigate to="/join/login"/>
    }

    return children
};

export default PrivateRoute;