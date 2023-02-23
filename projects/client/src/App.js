
import { Routes, Route } from "react-router-dom";
import Applogo from "./assets/img/1.svg"
import { AiOutlineShoppingCart } from "react-icons/ai";

import LandingPage from "./pages/landingPage";
import Hello from "./pages/hello";

export default function App() {
  
  return (
    <div className="App">
      {/* navbar */}
      <div className="flex justify-around gap-10 h-[100px] items-center drop-shadow-lg">
        <div>
          <img src={Applogo} alt="logo" className="w-[200px]"/>
        </div>
        <div>
          <ul className="flex gap-5">
            <li className="hover:border-b-2">Categories</li>
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
        <Route path="/hello" element={<Hello />} />
      </Routes>
    </div>
  );
}

