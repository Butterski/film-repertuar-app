import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Views/Home/Home'
import Admin from './Views/Admin/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
