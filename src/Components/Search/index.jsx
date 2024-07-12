import React from 'react';
import './Search.scss'

function Index({value, onChange}) {
    return (
        <input
            className="search-bar"
            type="Phone search"
            value={value}
            onChange={(e) => onChange(e.target.value)}/>
    )
}

export default Index;