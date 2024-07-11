import './scss/app.scss'
import Header from "./Components/Header.jsx";
import React from "react";
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
