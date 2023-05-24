import React from 'react';
import {MoonLoader} from "react-spinners";

const Loader = ({title = ""}) => {

    return (
        <div className="w-full flex justify-center  items-center flex-col">
            <MoonLoader/>
            {title && <h4 className="text-sm font-semibold mt-2">{title}</h4> }
        </div>
    );
};

export default Loader;