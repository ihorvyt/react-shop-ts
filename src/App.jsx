import './scss/app.scss'
import Header from "./Components/Header.jsx";
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";


export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="*" element={<Cart/>}/>
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default App
