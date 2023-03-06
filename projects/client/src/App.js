
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import Applogo from "./assets/img/1.svg"
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
// import cors from "cors";
export default function App() {
  const Navigate = useNavigate();

  let onProducts = () => {
    Navigate("/products");
  }
  return (
    <div className="App">
      {/* navbar */}
      <div className="flex justify-around gap-10 h-[100px] items-center drop-shadow-lg">
        <div onClick={() => Navigate('/')}>
          <img src={Applogo} alt="logo" className="w-[200px]"/>
        </div>
        <div>
          <ul className="flex gap-5">
            <li className="hover:border-b-2" onClick={onProducts}>Categories</li>
            <li className="hover:border-b-2">Deals</li>
            <li className="hover:border-b-2">What's New</li>
            <li className="hover:border-b-2">Delivery</li>
          </ul>
        </div>
        <div className="flex gap-7 items-center">
          <input type="text" placeholder="Search" className="border rounded-full text-center h-[50px] w-[400px]"/>
          <AiOutlineShoppingCart className="text-2xl"/>
          <button className="bg-green-400 border rounded-full w-[100px] h-[50px] p-2">Register</button>
        </div>
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
      </Routes>

      {/* footer */}
      <div className="h-[300px] border bg-slate-600 flex justify-around p-5">
          <div>
              <h1 className="text-xl font-bold">Gamepedia</h1>
              <p className="text-sm">One stop service for all gaming stuff</p>
              <p>email: support@gamepedia.com phone: (021)123456789</p>
              <p>copyright 2023</p>
          </div>
          <div>
          <ul className="flex flex-col gap-5">
              <li className="hover:text-white">Categories</li>
              <li className="hover:text-white">Deals</li>
              <li className="hover:text-white">What's New</li>
              <li className="hover:text-white">Delivery</li>
              <li className="hover:text-white">Accounts</li>
          </ul>
          </div>
      </div>
    
    </div>
  );
}

export default App

