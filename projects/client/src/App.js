
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import Applogo from "./assets/img/gamepedia-logo-3.png"
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./App.css";
import LandingPage from "./pages/landingPage";
import Register from "./pages/register"
import Activation from "./pages/activation"
import Login from "./pages/login"
import Profiling from "./pages/profiling";
import EditProfile from "./pages/editProfile";
import EditProfileForm from "./pages/editProfile";
import ResetPassword from './pages/resetPassword';
import ForgotPassword from './pages/forgotPassword';
import NotFound from './pages/notfound';
// import ChangePassword from "./pages/changePassword";
import ProductsPage from "./pages/productsPage";
import ProductsDetails from "./pages/productDetails";
import Cart from "./pages/cartPage";
// import cors from "cors";
export default function App() {
  const Navigate = useNavigate();

  let onProducts = () => {
    Navigate("/products");
  }

  const onHome = () => {
    Navigate("/");
  }
  return (
    <div className="App">
      {/* navbar */}
      <div className="flex justify-center gap-10 h-[90px] items-center drop-shadow-lg bg-[#18122B] sticky top-0 z-50">
        <div onClick={() => Navigate('/')}>
          <img src={Applogo} alt="logo" className="w-[200px]"/>
        </div>
        <div>
          <input type="text" placeholder="Search" className="border rounded-full text-center h-[40px] w-[900px]"/>
        </div>
        <div className="flex gap-4 items-center">
          <AiOutlineShoppingCart onClick={() => Navigate('/cart')} className="text-2xl text-white"/>
          <button onClick={() => {Navigate("/register")}} className="bg-[#443C68] rounded-full w-[100px] h-[40px] p-2 text-white">Register</button>
          <button onClick={() => {Navigate("/login")}} className="bg-[#443C68] rounded-full w-[100px] h-[40px] p-2 text-white">Login</button>
        </div>
      </div>

      <div>
          <ul className="flex gap-5 items-center pl-5 bg-[#18122B] h-[50px]">
            <li className="hover:border-b-2 text-white" onClick={onHome}>Home</li>
            <li className="hover:border-b-2 text-white">Delivery</li>
            <li className="hover:border-b-2 text-white" onClick={onProducts}>All Products</li>
          </ul>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/activation/:id" element={<Activation/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Profiling" element={<Profiling/>}/>
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/EditProfile" element={<EditProfileForm/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/notFound" element={<NotFound/>} />
        {/* <Route path="/changePassword" element={<ChangePassword/>}/> */}
        <Route path="/Products" element={<ProductsPage/>}/>
        <Route path="/Details/:id" element={<ProductsDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>

      {/* footer */}
      <div className="h-[300px] bg-[#393053] flex justify-around p-5">
          <div className="text-white">
              <h1 className="text-xl font-bold">Gamepedia</h1>
              <p className="text-sm">One stop service for all gaming stuff</p>
              <p>email: support@gamepedia.com phone: (021)123456789</p>
              <p>copyright 2023</p>
          </div>
          <div>
          <ul className="flex flex-col gap-5">
              <li onClick={onProducts} className="text-white">Categories</li>
              <li className="text-white">Delivery</li>
              <li className="text-white">Accounts</li>
          </ul>
          </div>
      </div>
    
    </div>
  );
}

