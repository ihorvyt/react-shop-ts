import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItemById} from "../../redux/slices/cartSlice.js";

function PizzaBlock({id, name, imageUrl, price, sizes, types}) {
    const typeNames = ["чорний", "білий"]
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItemById(id))
    const [activeColorType, setActiveColorType] = React.useState(0)
    const [activeSizeType, setActiveSizeType] = React.useState(sizes[0])

    const addedCount = cartItem? cartItem.count : 0;

    const onClickAdd = () => {
        const item = {
            id,
            name,
            price,
            imageUrl,
            color: typeNames[activeColorType],
            size: activeSizeType
        }

        dispatch(addItem(item))
    }

    return <div className="pizza-block">
        <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
        />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
            <ul>
                {
                    types.map((type, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveColorType(index)}
                            className={`${activeColorType === index ? "active" : ""}`}>
                            {typeNames[type]}
                        </li>
                    ))
                }
            </ul>
            <ul>
                {
                    sizes.map(size => (
                        <li
                            key={size}
                            onClick={() => setActiveSizeType(size)}
                            className={`${activeSizeType === size ? "active" : ""}`}>
                            {size}
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className="pizza-block__bottom">
            <div className="pizza-block__price">від {price} $</div>
            <div className="button button--outline button--add" onClick={onClickAdd}>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                    />
                </svg>
                <span>Добавити</span>
                {
                    addedCount > 0 && <i>{addedCount}</i>
                }
            </div>
        </div>
    </div>;
}

export default PizzaBlock