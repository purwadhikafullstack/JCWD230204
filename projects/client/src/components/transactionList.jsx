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
            <table >
                <thead>
                    <tr>
                        <td>Transaction Id</td>
                        <td>Transaction Date</td>
                        <td>status</td>
                        
                    </tr>
                </thead>
                <tbody>
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
        </div>
        </>
    )
}