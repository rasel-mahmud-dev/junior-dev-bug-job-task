import React, {useRef, useState} from 'react'
import {Avatar, DeliveryBx, Logo, Notification, Search} from '../Assets'
import Input from './Share/Input'
import SVGIcon from './Share/SVGIcon'
import {Link} from "react-router-dom";
import {useGlobalCtx} from "../Contexts/GlobalProvider";
import AuthDropdown from "./AuthDropdown";
import {FaSignInAlt} from "react-icons/fa";
import {CiShoppingCart} from "react-icons/ci";
import CartPopup from "./CartPopup";
import {apis} from "../apis/axios";

export default function TopHeader() {

    const [isOpenAuthDropdown, seOpenAuthDropdown] = useState(false)
    const [isOpenCart, setOpenCart] = useState(false)

    const {auth, productState: {carts}, setProductState} = useGlobalCtx()

    const delayRef = useRef()



    function handleChange(e) {
        const {value} = e.target

        // search product after delay user inout 200ms
        delayRef.current && clearTimeout( delayRef.current)
        delayRef.current = setTimeout(()=> handleSearchProducts(value), 200)
    }

    function handleSearchProducts(value){
        apis.get(`/api/products/search?text=${value}`).then(({data, status})=>{
            if(status === 200){
                setProductState({
                    products: data
                })
            }
        })
    }


    return (
        <div className="flex justify-between items-center py-5 space-x-8 relative" style={{zIndex: 10}}>


            { isOpenCart && <CartPopup   setProductState={setProductState} carts={carts} setOpenCart={setOpenCart} /> }

           <Link to="/">
               <div className="flex items-center space-x-3.5">
                   <SVGIcon Icon={Logo}/>
                   <p className="text-textHeader font-bold text-base leading-none">Project <br/> packers</p>
               </div>
           </Link>
            <div className="flex-1 relative">
                <Input register={{
                    onChange: handleChange
                }} placeholder="Paste the URL of the product" className="pl-12"/>
                <SVGIcon Icon={Search} className="absolute top-1/4 left-3"/>
            </div>
            <div className="flex items-center space-x-4  ">
                <p className="text-base font-normal text-textColor pr-2">Support</p>
                <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full">
                    <SVGIcon Icon={Notification}/>
                </div>
                <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full">
                    <SVGIcon Icon={DeliveryBx}/>
                </div>

                <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full relative" onClick={()=>setOpenCart(!isOpenCart)}>
                    <CiShoppingCart fontSize={25}/>
                    <div className="absolute -top-4 w-5 left-6 flex items-center justify-center h-5 rounded-full text-xs text-white bg-primary">
                        <span>{carts.length}</span>
                    </div>
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
