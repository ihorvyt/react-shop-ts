import React from "react";
import qs from "qs";
import {useNavigate} from "react-router-dom";

import Categories from "../Components/Categories.jsx";
import Sort from "../Components/Sort.jsx";
import Skeleton from "../Components/PhoneBlock/Skeleton.jsx";
import PhoneBlock from "../Components/PhoneBlock/index.jsx";
import Pagination from "../Components/Pagination/index.jsx";

import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice.js";
import {sortMethods} from "../Components/Sort.jsx";
import {fetchPhones, selectPizzaData} from "../redux/slices/phonesSlice.js";

export default function Home( ) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    const getPhones = async () => {
        const category = categoryId > 0 ? 'category=' + categoryId : '';
        const search = searchValue.length > 0 ? '&search=' + searchValue : '';

        dispatch(fetchPhones({
            currentPage,
            category,
            sort,
            search
        }));
    }

    // if first render was done, check URL query and save it in redux
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
            isSearch.current = true;
        }
    }, [])

    // fetch pizzas
    React.useEffect(() => {
        if (!isSearch.current) {
            getPhones()
        }
        isSearch.current = false;
    }, [categoryId, sort, searchValue, currentPage]);

    // if change params and first render was done
    React.useEffect(() => {
        if (isMounted.current) {
            const queryStrings = qs.stringify({
                sortProperty: sort.sort,
                categoryId: categoryId,
                currentPage: currentPage
            })

            navigate(`?${queryStrings}`)
        }
        isMounted.current = true;

    },[categoryId, sort.sort, currentPage])

    const phones = items.map(phone => (<PhoneBlock key={phone.id} {...phone}/>))
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
                    status === 'loading' ? skeletons : phones
                }
            </div>
            <Pagination value={currentPage} onChangePage={onChangePage} />
        </>
    )
}
