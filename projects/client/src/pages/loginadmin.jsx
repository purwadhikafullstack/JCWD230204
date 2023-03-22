import axios from "axios";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import LoadingSpin from "react-loading-spin";
import { useNavigate } from "react-router-dom";


export default function Login(){
	const [viewPassword, setviewPassword] = useState(false);
	const [emailError, setemailError] = useState();
	const [passwordError, setpasswordError] = useState();
	const [disabled, setdisabled] = useState();
	const [username, setUsername] = useState();

	const email = useRef();
	const password = useRef();

	const Navigate = useNavigate();

	let login = async () => {
		try {
			setdisabled(true);

			let { data } = await axios.post("http://localhost:8000/admin/login", {
				email: email.current.value,
				password: password.current.value,
			});
			localStorage.setItem("token", `${data.data.token}`);
			setUsername(data.data.name);
			toast.success(data);
			email.current.value = "";
			password.current.value = "";
			setTimeout(() => {
				Navigate("/home");
			}, 3000);
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setdisabled(false);
		}
	};

	
    return (
        <>
            <div className=" container h-screen flex justify-center align-center items-center">
                <div className=" bg-zinc-300 rounded-lg p-10 w-[350px] flex flex-col gap-3 justify-center border border-zinc-500">

                    <h2 className="font-semibold text-2x1 tracking-wide text-center">ADMIN LOGIN</h2>

                        <form>
                        <label 
                            htmlFor="email"
                            className="text-sm font-medium cursor-pointer mr-5">
                            Email :
                        </label>

                        <input 
                            className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" 
                            ref={email}
                            type={"email"} 
                            placeholder="enter your email address" 
                            id="email" 
                            name="email" 
                            required />{" "}
                            	<div>
								{emailError ? emailError : null}
							</div>
                        <br />

                        <label
                        htmlFor="password"
                        className="text-sm font-medium cursor-pointer mr-5">
                            Password :
                        </label>

                        <input 
                            className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full"
                            ref={password}
                            type={viewPassword ? "text" : "password"} 
                            placeholder="enter your password" 
                            id="password" 
                            name="password" 
                            required/>
                        
                        <br />

                        <div>
								{passwordError ? passwordError : null}

								{viewPassword ? (
									<AiFillEye
										onClick={() =>
											setviewPassword((viewPassword) => !viewPassword)
										}
									/>
								) : (
									<AiFillEyeInvisible
										onClick={() =>
											setviewPassword((viewPassword) => !viewPassword)
										}
									/>
								)}
                        </div>
                        </form>

						<button
							onClick={() => login ()}
							disabled={disabled}
							className="inline-flex w-full items-center justify-center mt-8 px-8 py-4 font-sans font-semibold tracking-wide hover:bg-red-600 text-black bg-green-500 rounded-lg h-[60px]"
						>
							{disabled ? (
								<LoadingSpin
									size={"30px"}
									primaryColor={"green"}
									secondaryColor={"red"}
								/>
							) : (
								"Login"
							)}
						</button>


                        <a
							className=" justify-center underline text-[14px] text-red-500 flex mt-[12px] "
							href="/login">
							Not an admin? Log in Now
						</a>

						<div className=" mt-[15px] flex items-center justify-center text-slate-400 text-[12px] ">
							<p>Don't have an account? </p>
							<a href="/register" className=" text-red-500 underline">
								Register Now
							</a>
                            
							<Toaster />
						</div>
                    </div>
             </div>
        </>
      )
    }
