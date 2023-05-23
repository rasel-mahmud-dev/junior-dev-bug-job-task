import React, {useState} from 'react'
import {Avatar, DeliveryBx, Logo, Notification, Search} from '../Assets'
import Input from './Share/Input'
import SVGIcon from './Share/SVGIcon'
import {Link} from "react-router-dom";
import {useGlobalCtx} from "../Contexts/GlobalProvider";
import AuthDropdown from "./AuthDropdown";
import {FaSignInAlt} from "react-icons/fa";

export default function TopHeader() {
    const [isOpenAuthDropdown, seOpenAuthDropdown] = useState(false)
    const {auth} = useGlobalCtx()
    return (
        <div className="flex justify-between items-center py-5 space-x-8">
            <div className="flex items-center space-x-3.5">
                <SVGIcon Icon={Logo}/>
                <p className="text-textHeader font-bold text-base leading-none">Project <br/> packers</p>
            </div>
            <div className="flex-1 relative">
                <Input placeholder="Paste the URL of the product" className="pl-12"/>
                <SVGIcon Icon={Search} className="absolute top-1/4 left-3"/>
            </div>
            <div className="flex items-center space-x-4 ">
                <p className="text-base font-normal text-textColor pr-2">Support</p>
                <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full">
                    <SVGIcon Icon={Notification}/>
                </div>
                <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full">
                    <SVGIcon Icon={DeliveryBx}/>
                </div>
                <div className="relative" onMouseLeave={()=>seOpenAuthDropdown(false)}>
                    {auth ? (
                        <img   onMouseOver={()=>seOpenAuthDropdown(true)} className="w-9 h-9 rounded-full object-contain" src={auth.avatar} alt=""/>
                    ) : (
                        <Link to="/join/login">
                            <div className="bg-[#FBE697] w-10 h-10 flex items-center justify-center rounded-full">
                                <FaSignInAlt />
                            </div>

                        </Link>)}

                    {auth && isOpenAuthDropdown && <AuthDropdown onMouseLeave={()=>seOpenAuthDropdown(false)} /> }

                </div>
            </div>
        </div>
    )
}
