import { useState, useEffect } from 'react';
import axios from 'axios';


export default function TransactionList() {

    const [transactionList, setTransactionList] = useState([])

    const getTransactionList = async() => {
        try {
            const response = await axios.get('http://localhost:8000/transaction/get', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            console.log(response.data.data)
            setTransactionList(response.data.data)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    useEffect(() => {
        getTransactionList()
    },[])
    return(
        <>
        <div className='flex flex-col gap-4'>
            <h1>Transaction List</h1>
            <table className='border-collapse border table-auto border-slate-200'>
                <thead className='border border-slate-100 bg-slate-100 p-4'>
                    <tr>
                        <td>Transaction Id</td>
                        <td>Transaction Date</td>
                        <td>status</td>
                        
                    </tr>
                </thead>
                <tbody className='border border-slate-100 p-4'>
                    {
                        transactionList.map((transaction) => {
                            return(
                                <tr>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.date.slice(0, 10)}</td>
                                    <td>{transaction.transactions_status.status_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className='flex gap-4 justify-center items-center border rounded-xl p-4 m-2'>
                <h1>id</h1>
                <h1>date</h1>
                <h1>status</h1>
            </div>
        </div>
        </>
    )
}