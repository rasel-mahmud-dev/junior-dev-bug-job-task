import React from 'react';
import Btn from "./Share/Btn";

const Product = ({product, onAddToCart, onBuyNow}) => {
    return (
        <div>
            <div className="shadow-md rounded bg-white p-4 flex flex-col justify-between">
                <div className="w-[200px] h-[200px] mx-auto">
                    <img  className="object-container" src={product.thumb} alt=""/>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold text-lg"> {product.title}</h4>
                    <h4 className="text-primary font-semibold">Taka {product.price}</h4>

                    <div className="flex mt-4 gap-x-4">
                        <Btn onClick={()=>onAddToCart(product._id)}>Add To Cart</Btn>
                        <Btn  onClick={()=>onBuyNow(product)} className="!p-2 !bg-header text-white">Buy Now</Btn>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product;