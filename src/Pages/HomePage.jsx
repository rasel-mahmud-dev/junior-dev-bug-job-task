import React, {useEffect} from 'react';
import {apis} from "../apis/axios";
import {useGlobalCtx} from "../Contexts/GlobalProvider";
import {Link, useNavigate} from "react-router-dom";
import Product from "../Components/Product";
import {toast} from "react-toastify";
import errorMessage from "../Utils/errorMessage";

const HomePage = () => {

    const {productState, setProductState, auth} = useGlobalCtx()

    const navigate = useNavigate()

    useEffect(() => {
        apis.get("/api/products").then(({data, status}) => {
            if (status === 200) {
                setProductState({
                    products: data
                })
            }
        })
    }, [])


    function handleAddToCart(productId) {
        if (!auth) return toast.error("To add to cart product, you need to login")
        apis.post("/api/carts", {productId, quantity: 1}).then(({data, status}) => {
            if (status === 201) {
                let newCartProduct = productState.products.find(p => p._id === productId)
                setProductState({
                    carts: [
                        ...productState.carts,
                        {
                            ...newCartProduct,
                            productId: productId,
                            _id: data._id
                        }
                    ]
                })
                toast.success("Product successfully added in cart")
            }
        }).catch(ex => {
            toast.error(errorMessage(ex))

        })
    }


    function handleBuyNow(product) {
        navigate("/checkout/"+product._id)
    }


    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl font-bold py-4">Products</h2>
                {auth && (
                    <Link to="/add-product" className="font-bold">
                        Add Product
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-20">
                {productState?.products?.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        onBuyNow={handleBuyNow}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

        </div>
    );
};

export default HomePage;