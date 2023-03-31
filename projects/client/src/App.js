import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

// userside
import LandingPage from "./pages/user/landingPage";
import Register from "./pages/user/register";
import Activation from "./pages/user/activation";
import Login from "./pages/user/login";
import Profiling from "./pages/user/profiling";
import EditProfile from "./pages/user/editProfile";
import EditProfileForm from "./pages/user/editProfile";
import ResetPassword from "./pages/user/resetPassword";
import ForgotPassword from "./pages/user/forgotPassword";
import NotFound from "./pages/user/notfound";
import ChangePassword from "./pages/user/changePassword";
import ProductsPage from "./pages/user/productsPage";
import ProductsDetails from "./pages/user/productDetails";
import Cart from "./pages/user/cartPage";
import ShippingPage from "./pages/user/shippingPage";
import UploadPayment from "./pages/user/uploadPayment";
import DashboardUsers from "./pages/user/dashboardUser";


// adminside
import LoginAdmin from "./pages/admin/loginadmin";
import Dashboard from "./pages/admin/dashboard";
import BranchDashboard from "./pages/admin/branchDashboard";
import BranchAdmin from "./pages/admin/branchAdmin";
import Discount from "./pages/admin/discount";
import ProductStocks from "./pages/admin/productStocks";
import SalesReport from "./pages/admin/salesReport";
import Transactions from "./pages/admin/transactions";

// import cors from "cors";
export default function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/activation/:id" element={<Activation />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/Profile" element={<Profiling />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
        <Route path="/user/EditProfile" element={<EditProfileForm />} />
        <Route path="/user/resetPassword/:id" element={<ResetPassword />} />
        <Route path="/user/forgotPassword" element={<ForgotPassword />} />
        <Route path="/user/changePassword" element={<ChangePassword />} />
        <Route path="/user/dashboard" element={<DashboardUsers />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="/user/Products" element={<ProductsPage />} />
        <Route path="/user/Details/:id" element={<ProductsDetails />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/shipping" element={<ShippingPage />} />
        <Route path="/user/uploadPayment/:id" element={<UploadPayment />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/branch/dashboard" element={<BranchDashboard/>} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/branchadmin" element={<BranchAdmin/>}/>
        <Route path="/admin/discount" element={<Discount/>}/>
        <Route path="/admin/productStock" element={<ProductStocks/>}/>
        <Route path="/admin/salesReport" element={<SalesReport/>}/>
        <Route path="/admin/transactions" element={<Transactions/>}/>
      </Routes>


      <Toaster/>
    </div>
  );
}
