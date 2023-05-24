import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apis} from "../apis/axios";
import {useGlobalCtx} from "../Contexts/GlobalProvider";


const Orders = () => {

    const navigate = useNavigate();

    const {
        auth,
        productState,
        setProductState,
    } = useGlobalCtx()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (auth) {
            apis.get("/api/orders").then(({data, status}) => {
                if (status === 200 && data?.status === "ok") {
                    setOrders(data.items || [])
                }
            })
        }
    }, [auth]);


    return (
        <div className=" p-4 ">

            <h1 className="text-2xl font-bold ">Orders </h1>

            <div className="pb-20">

                <table className="w-full mt-4  ">
                    <thead>
                    <tr className="">
                        <td className="font-medium pb-4">OrderId</td>
                        <td className="font-medium pb-4">items</td>
                        <td className="font-medium pb-4">Payment Status</td>
                        <td className="font-medium pb-4">Total Price</td>
                        <td className="font-medium pb-4">Quantity</td>
                        <td className="font-medium pb-4">Ordered At</td>
                    </tr>
                    </thead>
                    <tbody>

                    {orders?.length === 0 && (
                        <div className="">
                            <h4 className="text-sm font-medium ">No Order created yet</h4>
                        </div>
                    )}

                    {orders?.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
                                <div>
                                    {order.items.map(item => (
                                        <div className="flex items-center gap-x-2">
                                            <img className="w-10 h-10 object-contain" src={item.thumb} alt=""/>
                                            <h4>{item.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td>{order.isPaid ? "PAID" : "UNPAID"}</td>
                            <td>{order.totalPrice} Taka</td>
                            <td>{order?.items.length}</td>
                            <td>{new Date(order?.createdAt).toDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;