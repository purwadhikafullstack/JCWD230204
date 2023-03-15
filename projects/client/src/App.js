import { Routes, Route, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Applogo from "./assets/img/gamepedia-logo-3.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./App.css";
import LandingPage from "./pages/landingPage";
import Register from "./pages/register";
import Activation from "./pages/activation";
import Login from "./pages/login";
import Profiling from "./pages/profiling";
import EditProfile from "./pages/editProfile";
import EditProfileForm from "./pages/editProfile";
import ResetPassword from "./pages/resetPassword";
import ForgotPassword from "./pages/forgotPassword";
import NotFound from "./pages/notfound";
import ChangePassword from "./pages/changePassword";
import ProductsPage from "./pages/productsPage";
import ProductsDetails from "./pages/productDetails";
import Cart from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";
// import cors from "cors";
export default function App() {
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
  return (
    <div className="App">
      {/* navbar */}
      <div className="flex justify-center gap-10 h-[90px] items-center drop-shadow-lg bg-[#18122B] sticky top-0 z-50">
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
          <AiOutlineShoppingCart
            onClick={() => Navigate("/cart")}
            className="text-2xl text-white"
          />
          {localStorage.getItem("token") ? (
            <>
            <div className="flex gap-4 text-white">
            <button
              onClick={() => {
                Navigate("/profile");
              }}
              className="bg-[#443C68] rounded-full w-[100px] h-[40px] p-2 text-white"
            >
              Profile
            </button>
            <button onClick={onLogout}>logout</button>
            </div>
            </>
            
          ) : (
            <>
            <button
              onClick={() => {
                Navigate("/login");
              }}
              className="bg-[#443C68] rounded-full w-[100px] h-[40px] p-2 text-white"
            >
              Login
            </button>
            </>
            
          )}
        </div>
      </div>

      <div>
        <ul className="flex gap-5 items-center pl-5 bg-[#18122B] h-[50px]">
          <li className="hover:border-b-2 text-white" onClick={onHome}>
            Home
          </li>
          <li className="hover:border-b-2 text-white">Delivery</li>
          <li className="hover:border-b-2 text-white" onClick={onProducts}>
            All Products
          </li>
        </ul>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activation/:id" element={<Activation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profiling />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/EditProfile" element={<EditProfileForm />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/notFound" element={<NotFound />} />
        {/* <Route path="/changePassword" element={<ChangePassword/>}/> */}
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Details/:id" element={<ProductsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {/* footer */}
      <div className="h-[300px] bg-[#6E85B2] flex flex-col p-5">
        <div className=" flex justify-around p-5 border-b-2 border-white">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Gamepedia</h1>
            <p className="text-lg">One stop service for all gaming stuff</p>
          </div>
          <div className="flex flex-col gap-3 text-white">
            <div>
              <p className="text-lg">Quick Menu</p>
              <ul className="text-md">
                <li onClick={onProducts}>Categories</li>
                <li>Delivery</li>
                <li>Accounts</li>
              </ul>
            </div>
            <div>
              <p className="text-lg">Categories</p>
              <ul className="text-md">
                <li>Consoles</li>
                <li>Games</li>
                <li>Accesories</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-white">
            <div>
              <p className="text-lg">Pages</p>
              <ul className="text-md">
                <li>Term and Condition</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <p className="text-lg">Contact</p>
              <ul className="text-md">
                <li>Email: Support@gamepedia.com</li>
                <li>Whatsapp</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[100px] flex justify-center items-center">
          <h1>© 𝟤𝟢𝟤𝟥 Gamepedia. 𝘈𝘭𝘭 𝘙𝘪𝘨𝘩𝘵 𝘙𝘦𝘴𝘦𝘳𝘷𝘦𝘥</h1>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
