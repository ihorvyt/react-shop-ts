import React from 'react';
import './Search.scss'

function Index({searchValue, onSearchValueChange}) {
    return (
        <input
            className="search-bar"
            type="Phone search"
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}/>
    )
}

export default Index;