
import "./App.css";

import { Routes, Route } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
import Hello from "./pages/Hello";

function App() {
  
  return (
    <div className="App">
      

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/hello" element={<Hello />} />
      </Routes>
    </div>
  );
}

export default App;
