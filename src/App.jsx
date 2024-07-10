import './scss/app.scss'
import Header from "./Components/Header.jsx";
import Categories from "./Components/Categories.jsx";
import Sort from "./Components/Sort.jsx";
import PhoneBlock from "./Components/PhoneBlock.jsx";


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Всі піци</h2>
                    <div className="content__items">
                        <PhoneBlock title="Pixel" price={200}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
