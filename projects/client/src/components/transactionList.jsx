import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function TransactionList() {

    const [transactionList, setTransactionList] = useState([])

    const Navigate = useNavigate()

    const getTransactionList = async() => {
        try {
            const response = await axios.get('http://localhost:8000/transaction/get', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            console.log(response.data.data[0].id)
            setTransactionList(response.data.data)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const uploadPaymentHandler = async(id) => {
        try {
            Navigate(`/uploadPayment/${id}`)
        } catch (error) {
            console.log(error.message)
        }
    }

    const confirmOrder = async(id) => {
        try {
            await axios.get(`http://localhost:8000/transaction/confirmOrder?id=${id}`, {}, {
                headers: {token: localStorage.getItem('token')}
            })
        } catch (error) {
            
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
                                    <td key={transaction.id}>{transaction.id}</td>
                                    <td key={transaction.id}>{transaction.date.slice(0, 10)}</td>
                                    {
                                        transaction.transactions_status.status_name === "Waiting for Payment" ?
                                        (<td className='flex gap-4' key={transaction.id}>{transaction.transactions_status.status_name} <button onClick={() => uploadPaymentHandler(transaction.id)}>upload Payment</button> </td>) :
                                        transaction.transactions_status.status_name === "Delivery" ? 
                                        (<td className='flex gap-4' key={transaction.id}>{transaction.transactions_status.status_name} <button>Confirm Payment</button> </td>) :
                                        (<td>{transaction.transactions_status.status_name}</td>)
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className='flex gap-4 justify-center items-center border rounded-xl p-4 m-2'>
                <h1>Transaction Detail No. 11223456739382</h1>
                <div>
                    <div>product name</div>
                    <div>product price</div>
                    <div>product quantity</div>
                </div>
            </div>
        </div>
        </>
    )
}