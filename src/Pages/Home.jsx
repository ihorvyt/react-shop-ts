import Categories from "../Components/Categories.jsx";
import Sort from "../Components/Sort.jsx";
import Skeleton from "../Components/PhoneBlock/Skeleton.jsx";
import PhoneBlock from "../Components/PhoneBlock/index.jsx";
import React from "react";
import ReactPaginate from "react-paginate";
import Pagination from "../Components/Pagination/index.jsx";

export default function Home({searchValue}) {
    const [phones, setPhones] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [sortMethod, setSortMethod] = React.useState({name: "популярності", sort: "rating"});
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);


    const category = categoryId > 0 ? 'category=' + categoryId : '';
    const search = searchValue.length > 0 ? '&search=' + searchValue : '';
    const sortBy = sortMethod.sort;

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://668fde68c0a7969efd99e538.mockapi.io/phones?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=desc${search}`)
            .then(res => res.json())
            .then(json => {
                setIsLoading(false)
                setPhones(Array.isArray(json) ? json : []);
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortMethod, searchValue, currentPage]);


    const items = phones
        .map(phone => (<PhoneBlock key={phone.id} {...phone}/>))
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

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
                    isLoading ? skeletons : items
                }
            </div>
            <Pagination onChangePage={setCurrentPage} />
        </>
    )
}