import React from 'react';

function Categories({value, onChange}) {
    const categories = ["Всі", "Apple", "Pixel", "Samsung", "Vivo", "Motorola"]

    return <div className="categories">
        <ul>
            {
                categories.map((category, index) => {
                    return (
                        <li key={index}
                            className={value === index ? 'active' : ''}
                            onClick={() => onChange(index)}>
                            {category}
                        </li>
                    )
                })
            }
        </ul>
    </div>;
}

export default Categories;