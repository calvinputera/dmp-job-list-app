import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JobsDetail from "./pages/JobsDetail";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} setIsAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/job/:id"
          element={<JobsDetail setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
