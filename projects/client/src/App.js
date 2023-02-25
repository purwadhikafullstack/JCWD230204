import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Profiling from "./pages/profiling";
import EditProfileForm from "./pages/editProfile";
import { Route, Routes } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/Profiling" element={<Profiling/>}/>
        <Route path="/EditProfile" element={<EditProfileForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
