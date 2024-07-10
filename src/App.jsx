import './scss/app.scss'
import Header from "./Components/Header.jsx";
import Categories from "./Components/Categories.jsx";
import Sort from "./Components/Sort.jsx";
import PhoneBlock from "./Components/PhoneBlock.jsx";
import phones from "./assets/phones.json";

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
                        {
                            phones.map((phone, index) => (
                                <PhoneBlock
                                    key={index}
                                    title={phone.name}
                                    image={phone.imageUrl}
                                    price={phone.price}
                                    sizes={phone.sizes}
                                    types={phone.types}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
