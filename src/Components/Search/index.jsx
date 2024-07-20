import './Search.scss'
import {setSearchValue} from "../../redux/slices/filterSlice.js"
import {useDispatch, useSelector} from "react-redux";

function Search() {
    const {searchValue} = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    return (
        <input
            className="search-bar"
            type="Phone search"
            value={searchValue}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}/>
    )
}

export default Search;