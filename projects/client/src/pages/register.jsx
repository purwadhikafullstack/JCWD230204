import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'

export default function Register (){
    const [name, setName] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [phone, setPhone] = useState (0);

    const Navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const {data}= await axios.post('http://localhost:8000/users/register', {username:name, email:email, password:password, phone_number:phone});
            console.log(data);
             toast.success (data.message)
             setTimeout(()=> {
                Navigate("/login")
             }, 2000)
        } catch (error) {
            console.log(error);
            toast.error (error.response.data.message);     
        }
    }; 
  
  return (
    <>
        <div className=" container h-screen flex justify-center align-center items-center">
            {/* Form */}
            <div className=" bg-zinc-300 rounded-lg p-10 w-[350px] flex flex-col gap-3 justify-center border border-zinc-500">
                <h2 className="font-semibold text-2x1 tracking-wide text-center">REGISTRATION</h2>
                <form>
                <label className=" mr-5">
                    Name :
                    <input className="  text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder=" type your username here" />
                </label>
                <br />

                <label>
                    Email :
                    <input className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" />
                </label>
                <br />

                <label>
                    Password :
                    <input className="  text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" />
                </label>
                <br />

                <label>
                    Phone Number :
                    <input className="  text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="*******"/>
                </label>
                <br />
                </form>

                <button onClick={()=> handleSubmit()} className=" bg-white p-2 border rounded-md text-center" type="submit">Register</button>


                <p> Already have an account? <a href="/login" className=" text-red-700 underline">Login here </a></p>
                <button type="submit">Forgot Password?</button>
                <Toaster />
                </div>
        </div>
    </>
  );
}

