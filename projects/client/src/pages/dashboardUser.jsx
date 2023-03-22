import { useState, useEffect } from "react";
import {useNavigate, Routes, Route} from 'react-router-dom'
import axios from 'axios'

import TransactionList from '../components/transactionList'

export default function DashboardUser(){

    const [select, setSelect] = useState('')
    
    useEffect(() => {
        
    }, [])

    return(
        <>
        <div className="flex justify-center bg-[#1c1c1c]">
            <div className="flex flex-col gap-5 w-[200px] h-[700px] border my-4 p-4 rounded-l-xl bg-white">
                 {/* sidebar */}
                <div>
                    <ul>
                        <li onClick={() => {setSelect('dashboard')}}>Dashboard</li>
                        <li onClick={() => {setSelect('profile')}}>Profile</li>
                        <li onClick={() => {setSelect('Transaction')}}>Transaction</li>
                        <li onClick={() => {setSelect('TransactionHistory')}}>Transaction History</li>
                    </ul>
                </div>
                <div>
                    <button>Logout</button>
                </div>
               
            </div>
            <div className="w-[800px] h-[700px] border my-4 p-4 rounded-r-xl bg-white">
                {/* content */}
                {
                    select === "Transaction" ? (<TransactionList />) : 
                    select === "TransactionHistory" ? (<h1>Transaction History</h1>) :
                    select === "profile" ? (<h1>Profile</h1>) : 
                    (<h1>Dashboard</h1>)
                }
            </div>
        </div>
        </>
    )
}