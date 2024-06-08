// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./LoginPage";
import Register from "./register";
import Home from "./Home";
import Success from "./success";
import Fail from "./fail";


function App() {
  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
