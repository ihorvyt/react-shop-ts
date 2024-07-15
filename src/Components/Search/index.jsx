import React, {useContext} from 'react';
import './Search.scss'
import debounce from "lodash.debounce"
import {SearchContext} from "../../App.jsx";

function Search() {
    const {searchValue, setSearchValue } = useContext(SearchContext)

    return (
        <input
            className="search-bar"
            type="Phone search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}/>
    )
}

export default Search;