import axios from "axios";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import toast, { Toaster } from "react-hot-toast";



export default function ResetPassword (){

    const password = useRef();
    const confirmPassword = useRef();

    const [newPassword, setNewPassword] = useState (false);
    const [conNewPassword, setConNewPassword] = useState (false);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState();

    const Navigate = useNavigate();
    const location = useLocation();

    
	let onResetPassword = async () => {
		try {
			setDisabled(true);

			let { data } = await axios.patch(
				"http://localhost:8000/user/reset-password/id",
				{ id: location.pathname.slice(16), password: password.current.value, confiemPassword: confirmPassword.current.value }
			);

			toast.success(data.message);
			password.current.value = ''
			confirmPassword.current.value = ''

			setTimeout(() => {
				Navigate("/login");
			}, 3000);
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setDisabled(false);
		}
	};

    let validatePassword = (value) => {
		if (value === "") {
			setData("Please input your new password");
		} else if (value.length < 8) {
			setData("Password less than 8 character, please input more");
		} else if (
			!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
				value
			)
		) {
			setData("Password must contain number and capital");
		} else {
			setData("");
		}
	};
	
	let validateConfirmPassword = (value) => {
		if (value === "") {
			setData("Please input your confirm password");
		} else if (value.length < 8) {
			setData("Password less than 8 character, please input more");
		} else if (
			!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
				value
			)
		) {
			setData("Password must contain number and capital");
		} else {
			setData("");
		}
	};

    return (
        <>
            <div className=" container h-screen flex justify-center align-center items-center">
                <div className=" bg-zinc-300 rounded-lg p-10 w-[350px] flex flex-col gap-3 justify-center border border-zinc-500">

                    <h2 className="font-semibold text-2x1 tracking-wide text-center">RESET PASSWORD</h2>

                        <form>
                        <label 
                            htmlFor="password"
                            className="text-sm font-medium cursor-pointer mr-5">
                            New Password
                        </label>

                        <input 
                            className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full" 
                            ref={password}
                            type={newPassword ? "text" : "password"}
                            onChange={(e) => validatePassword(e.target.value)} 
                            placeholder="enter your new password" 
                            required />
                            <div>
								{data ? data : null}
							</div>
                            <div className=" text-2xl absolute right-5 top-12">
								{newPassword ? (
									<AiFillEye
										onClick={() =>
											setNewPassword((newPassword) => !newPassword)
										}
									/>
								) : (
									<AiFillEyeInvisible
										onClick={() =>
											setNewPassword((newPassword) => !newPassword)
										}
									/>
								)}
							</div>

                        <br />

                        <label
                        htmlFor="password"
                        className="text-sm font-medium cursor-pointer mr-5">
                            Confirm Password
                        </label>

                        <input 
                            className=" text-zinc-600 outline-none px-5 h-10 border rounded-md border-sm w-full"
                            ref={confirmPassword}
                            type={conNewPassword ? "text" : "password"} 
                            onChange={(e) => validateConfirmPassword(e.target.value)}
                            placeholder="confirm your new password"  
                            required/>
                            <div>
								{data ? data : null}
							</div>
                            <div className=" text-2xl absolute right-5 top-12">
								{conNewPassword ? (
									<AiFillEye
										onClick={() =>
											setConNewPassword((conNewPassword) => !conNewPassword)
										}
									/>
								) : (
									<AiFillEyeInvisible
										onClick={() =>
											setConNewPassword((conNewPassword) => !conNewPassword)
										}
									/>
								)}
							</div>
                        <br />
                        </form>

						<button
							onClick={() => onResetPassword ()}
							disabled={disabled}
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
								"submit"
							)}
						</button>
                            
							<Toaster />
						</div>
                    </div>
        </>
      )
    }

