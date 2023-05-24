import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apis} from "../apis/axios";
import {useGlobalCtx} from "../Contexts/GlobalProvider";


const Transaction = () => {

    const navigate = useNavigate();

    const {
        auth,
        productState,
        setProductState,
    } = useGlobalCtx()

    const [transactions, setTransaction] = useState([])

    useEffect(() => {
        if (auth) {
            apis.get("/api/transactions").then(({data, status}) => {
                if (status === 200 && data?.status === "ok") {
                    setTransaction(data.items || [])
                }
            })
        }
    }, [auth]);


    return (
        <div className=" p-4 ">

            <h1 className="text-2xl font-bold ">Transactions </h1>

            <div className="pb-20">

                <table className="w-full mt-4  ">
                    <thead>
                    <tr className="">
                        <td className="font-medium pb-4">TransactionID</td>
                        <td className="font-medium pb-4">OrderID</td>
                        <td className="font-medium pb-4">Amount</td>
                        <td className="font-medium pb-4">Currency</td>
                        <td className="font-medium pb-4">Payer Phone</td>
                    </tr>
                    </thead>
                    <tbody>

                    {transactions?.length === 0 && (
                        <div className="">
                            <h4 className="text-sm font-medium ">No Transaction found</h4>
                        </div>
                    )}

                    {transactions?.map((tnx) => (
                        <tr key={tnx._id}>
                            <td>{tnx._id}</td>
                            <td>
                                {tnx.transactionId}
                            </td>

                            <td>{tnx.amount}</td>
                            <td>{tnx.currency}</td>
                            <td>{tnx.payerReference}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction;