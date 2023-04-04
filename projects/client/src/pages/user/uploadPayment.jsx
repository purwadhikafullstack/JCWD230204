import axios from 'axios';
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast, Toaster } from 'react-hot-toast';
import NavbarUser from "../../components/navbaruser";
import HomeMenu from "../../components/homemenu";
import Footer from "../../components/footer";

export default function UploadPayment() {

    const Navigate = useNavigate();
    const Token = localStorage.getItem('token');

    const onSubmit = async() => {
        try {
            axios.post(`http://localhost:8000/transaction/uploadPayment`, {
                headers: {
                    Token
                }
            })
            console.log("Upload Payment")
            toast.success("Upload Payment Success")
            setTimeout(() => {
                Navigate('/')
            }, 1000)
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <>
        <NavbarUser/>
        <HomeMenu/>
        <div className="flex flex-row justify-center bg-[#1c1c1c] ">
            <div className="flex flex-col gap-4 border rounded-xl text-black bg-[#e6e6e6] w-[500px] h-[500px] p-4 m-5">
                <div>
                    <h1>Upload Payment</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <label>Upload Your Payment Here</label>
                    <input type="file" name="payment" />
                </div>
                <div className="flex justify-center">
                    <button onClick={onSubmit} className="bg-[#db2b39] text-white p-4 rounded-full w-[100px] ">Submit</button>
                </div>
            </div>
            <Toaster/>
        </div>
        <Footer/>
        </>
    )
}