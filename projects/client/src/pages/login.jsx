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

			let { data } = await axios.post("http://localhost:8000/user/login", {
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

	let validateEmail = (value) => {
		if (value === "") {
			setemailError("Please input your email");
		} else if (
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(value)
		) {
			setemailError("Format Email Invalid");
		} else {
			setemailError("");
		}
	};

	let validatePassword = (value) => {
		if (value === "") {
			setpasswordError("Please input your password");
		} else if (value.length < 8) {
			setpasswordError("Password less than 8 character, please input more");
		} else if (
			!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
				value
			)
		) {
			setpasswordError("Password must contain number and capital");
		} else {
			setpasswordError("");
		}
	};

    return (
        <>
            <div className=" container h-screen flex justify-center align-center items-center">
                <div className=" bg-zinc-300 rounded-lg p-10 w-[350px] flex flex-col gap-3 justify-center border border-zinc-500">

                    <h2 className="font-semibold text-2x1 tracking-wide text-center">LOGIN</h2>

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
                            onChange={(e) => validateEmail(e.target.value)} 
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
                            onChange={(e) => validatePassword(e.target.value)} 
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
							disabledd={disabled}
							type="submit"
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
							className=" text-red-500 flex justify-end content-end mt-[10px] "
							href="/forgotPassword">
							Forgot Password?
						</a>

                        <a
							className=" justify-center underline text-[14px] text-red-500 flex mt-[12px] "
							href="/loginadmin">
							Log in as admin
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
