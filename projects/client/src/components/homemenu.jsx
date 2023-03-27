import { useNavigate } from "react-router-dom";
import { toast} from "react-hot-toast";


export default function HomeMenu(){
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
        <div>
        <ul className="flex gap-5 items-center pl-5 bg-[#6d6d6d] h-[50px]">
          <li className="hover:border-b-2 text-white" onClick={onHome}>
            Home
          </li>
          <li className="hover:border-b-2 text-white">Delivery</li>
          <li className="hover:border-b-2 text-white" onClick={onProducts}>
            All Products
          </li>
        </ul>
      </div>
    )
}