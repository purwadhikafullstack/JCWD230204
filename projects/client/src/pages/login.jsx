import React, { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Sending login data: ${email}, ${password}`);
    }

    return (
        <>
            <div className=" container h-screen flex justify-center align-center items-center">
                <div className=" bg-zinc-300 rounded-lg p-10 w-[350px] flex flex-col gap-3 justify-center border border-zinc-500">
                    <h2 className="font-semibold text-2x1 tracking-wide text-center">LOGIN</h2>
                        <form onSubmit={handleSubmit}>
                        <label className="mr-5">
                            Email:
                            <input className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full"type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />
                        </label>
                        <br />
                        </form>

                        <button className="bg-white p-2 border rounded-md text-center" type="submit">Log in</button>
                        
                        <p> Don't have an account? <a href="/register" className=" text-red-700 underline"> Register here</a></p>
                    </div>
             </div>
        </>
      )
    }
