import { Routes, Route, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Applogo from "./../assets/img/gamepedia-logo-3.png"
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function NavbarUser(){
    const Navigate = useNavigate();

  let onProducts = () => {
    Navigate("/products");
  };

  const onHome = () => {
    Navigate("/");
  };

  const onLogout = () => {
    localStorage.removeItem("token")
    toast("Logged out successfully")
    setTimeout(() => {
      window.location.reload()
    },1000)
  }
    return(
    <div className="flex justify-center gap-10 h-[90px] items-center drop-shadow-lg bg-[#1c1c1c] sticky top-0 z-50">
    <div onClick={() => Navigate("/")}>
      <img src={Applogo} alt="logo" className="w-[200px]" />
    </div>
    <div>
      <input
        type="text"
        placeholder="Search"
        className="border rounded-full text-center h-[40px] w-[900px]"
      />
    </div>
    
    <div className="flex gap-4 items-center">
      {localStorage.getItem("token") ? (
        <AiOutlineShoppingCart
        onClick={() => Navigate("/cart")}
        className="text-2xl text-white"
      />
      ) : (
        <AiOutlineShoppingCart
        onClick={() => toast("Please login to continue")}
        className="text-2xl text-white"
      />
      )}
      {localStorage.getItem("token") ? (
        <>
        <div className="flex gap-4 text-white">
        <button
          onClick={() => {
            Navigate("/user/dashboard");
          }}
          className="bg-[#db2b39] rounded-full w-[140px] h-[40px] p-2 text-white"
        >
          Dashboard
        </button>
        <button onClick={onLogout}>logout</button>
        </div>
        </>
        
      ) : (
        <>
        <button
          onClick={() => {
            Navigate("/user/login");
          }}
          className="bg-[#db2b39] rounded-full w-[100px] h-[40px] p-2 text-white"
        >
          Login
        </button>
        </>
        
      )}
    </div>
  </div>
    )
}