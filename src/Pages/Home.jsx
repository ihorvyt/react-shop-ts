import Categories from "../Components/Categories.jsx";
import Sort from "../Components/Sort.jsx";
import Skeleton from "../Components/PhoneBlock/Skeleton.jsx";
import PhoneBlock from "../Components/PhoneBlock/index.jsx";
import React from "react";

export default function Home() {
    const [phones, setPhones] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [sortMethod, setSortMethod] = React.useState({name: "популярності", sort: "rating"});
    const [categoryId, setCategoryId] = React.useState(0);

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://668fde68c0a7969efd99e538.mockapi.io/phones?${categoryId > 0 ? 'category=' + categoryId : ''}sortBy=${sortMethod.sort}&order=desc`)
            .then(res => res.json())
            .then(json => {
                setIsLoading(false)
                setPhones(Array.isArray(json) ? json : []);
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortMethod]);

    return (
        <>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChange={setCategoryId}
                />
                <Sort
                    value={sortMethod}
                    onChange={setSortMethod}
                />
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {
                    isLoading ?
                        [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : phones && phones.map(phone => (<PhoneBlock key={phone.id} {...phone}/>))
                }
            </div>
        </>
    )
}