import { useState, useEffect } from "react";

import TransactionList from '../components/transactionList'
import Profile from '../components/profile'
import { MdOutlineDashboard, MdHistory, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";

export default function DashboardUser(){

    const [select, setSelect] = useState('')
    
    useEffect(() => {
        
    }, [])

    return(
        <>
        <div className="flex justify-center bg-[#1c1c1c]">
            <div className="flex flex-col gap-7 w-[200px] h-[700px] border my-4 p-4 rounded-l-xl bg-white">
                 {/* sidebar */}
                <div className="text-lg">
                    <ul className="flex flex-col gap-5">
                        <li className="flex gap-3 items-center" onClick={() => {setSelect('dashboard')}}> <MdOutlineDashboard/> Dashboard</li>
                        <li className="flex gap-3 items-center" onClick={() => {setSelect('profile')}}> <CgProfile/> Profile</li>
                        <li className="flex gap-3 items-center" onClick={() => {setSelect('Transaction')}}> <GrTransaction/> Transaction</li>
                        <li className="flex gap-3 items-center" onClick={() => {setSelect('TransactionHistory')}}> <MdHistory/> Transaction History</li>
                    </ul>
                </div>
                <div>
                    <button className="flex gap-3 items-center">Logout <MdLogout/> </button>
                </div>
               
            </div>
            <div className="w-[800px] h-[700px] border my-4 p-4 rounded-r-xl bg-white">
                {/* content */}
                {
                    select === "Transaction" ? (<TransactionList />) : 
                    select === "TransactionHistory" ? (<h1>Transaction History</h1>) :
                    select === "profile" ? (<Profile />) : 
                    (<h1>Dashboard</h1>)
                }
            </div>
        </div>
        </>
    )
}