import React from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/add" element={<AddUser />}></Route>
          <Route path="user/edit/:id" element={<EditUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
