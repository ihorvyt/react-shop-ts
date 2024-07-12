import './scss/app.scss'
import Header from "./Components/Header.jsx";
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import {Route, Routes} from "react-router-dom";
import {useState} from "react";

function App() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} onSearchValueChange={setSearchValue} />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue} />}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
