import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; 
import Supermarket from "./components/Supermarket";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Billing from "./components/Billing";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/supermarket" element={<Supermarket />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </Router>
  );
}
