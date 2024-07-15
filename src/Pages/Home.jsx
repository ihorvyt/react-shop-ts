import Categories from "../Components/Categories.jsx";
import Sort from "../Components/Sort.jsx";
import Skeleton from "../Components/PhoneBlock/Skeleton.jsx";
import PhoneBlock from "../Components/PhoneBlock/index.jsx";
import React from "react";
import axios from "axios";
import Pagination from "../Components/Pagination/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {SearchContext} from "../App.jsx";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice.js";
import qs from "qs";
import {sortMethods} from "../Components/Sort.jsx";

import {useNavigate} from "react-router-dom";

export default function Home( ) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { categoryId, sort, currentPage } = useSelector(state => state.filter)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    const fetchPhones = () => {
        const category = categoryId > 0 ? 'category=' + categoryId : '';
        const search = searchValue.length > 0 ? '&search=' + searchValue : '';

        setIsLoading(true)
        axios.get(`https://668fde68c0a7969efd99e538.mockapi.io/phones?page=${currentPage}&limit=4&${category}&sortBy=${sortMethod}&order=desc${search}`)
            .then((res) => {
                setPhones(res.data);
                setIsLoading(false)
            })
    }

    const sortMethod = sort;
    const {searchValue} = React.useContext(SearchContext)
    const [phones, setPhones] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        if (isSearch.current) {
            fetchPhones()
        }
        console.log(1)
        isSearch.current = false;
    }, [categoryId, sortMethod, searchValue, currentPage]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryStrings = qs.stringify({
                sortProperty: sort.sort,
                categoryId: categoryId,
                currentPage: currentPage
            })

            navigate(`?${queryStrings}`)
        }
        console.log(2)
        isMounted.current = true;
    },[sort.sort, categoryId, currentPage])

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortMethods.find(obj => obj.sort === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
        console.log(3)
    }, [])

    const items = phones.map(phone => (<PhoneBlock key={phone.id} {...phone}/>))
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    return (
        <>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChange={onClickCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : items
                }
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </>
    )
}