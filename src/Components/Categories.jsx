import React from 'react';

function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const categories = ["Всі", "Apple", "Pixel", "Samsung", "Vivo", "Motorola"]

    const onClickCategory = (index) => {
        setActiveIndex(index)
    }

    return <div className="categories">
        <ul>
            {
                categories.map((category, index) => {
                    return (
                        <li key={index}
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => onClickCategory(index)}>
                            {category}
                        </li>
                    )
                })
            }
        </ul>
    </div>;
}

export default Categories;