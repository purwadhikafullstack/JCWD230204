import "./App.css";
import { Routes, Route } from "react-router-dom";

import Hello from "./pages/Hello";
import Activation from "./pages/activation"
import Register from "./pages/register"
import Login from "./pages/login"

function App() {


  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/activation/:id" element={<Activation/>} />
      </Routes>

    </div>
  );
}

export default App;
