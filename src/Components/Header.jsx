import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom";

export default function Header() {

    const location = useLocation()

    const [breadcrumbsData, setBreadcrumbsData] = useState([])

    useEffect(() => {
        if (location.pathname === "/") {
            setBreadcrumbsData([{label: "Home", path: "/"}])
        } else if (location.pathname.includes("/checkout")) {
            setBreadcrumbsData([
                {label: "Home", path: "/"},
                {label: "Checkout", path: location.pathname}
            ])
        } else if (location.pathname.includes("/join/login")) {
            setBreadcrumbsData([
                {label: "Home", path: "/"},
                {label: "Login", path: location.pathname}
            ])
        } else if (location.pathname.includes("/join/new")) {
            setBreadcrumbsData([
                {label: "Home", path: "/"},
                {label: "Register", path: location.pathname}
            ])
        } else if (location.pathname.includes("/add-product")) {
            setBreadcrumbsData([
                {label: "Home", path: "/"},
                {label: "Add Product", path: location.pathname}
            ])
        }
    }, [location]);


    return (
        <div className="bg-header h-12" >
            <nav className="rounded-md ml-auto mr-auto container h-full">
                <ol className="list-reset flex h-full items-center text-sm font-normal">
                    {breadcrumbsData.map((item, index) => (
                        <div className="flex items-center text-white text-opacity-60">
                            {breadcrumbsData.length > 1 && index !== 0 && (
                                <div className=" px-2">/</div>
                            )}
                            <li>
                                <Link to={item.path} className="text-white text-opacity-60 "
                                >{item.label}</Link>
                            </li>
                        </div>
                    ))}
                </ol>
            </nav>
        </div>
    )
}
