import React from 'react'
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="bg-header h-12">
            <nav className="rounded-md ml-auto mr-auto container h-full">
                <ol className="list-reset flex h-full items-center text-sm font-normal">
                    <li>
                        <Link to="/" className="text-white text-opacity-40 "
                        >Home</Link>
                    </li>
                    <li>
                        <span className="mx-2 text-white">/</span>
                    </li>
                    <li className="text-white dark:text-neutral-400">Checkout</li>
                </ol>
            </nav>
        </div>
    )
}
