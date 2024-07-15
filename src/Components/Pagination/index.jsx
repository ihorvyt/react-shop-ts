import ReactPaginate from "react-paginate";
import React from "react";
import './ReactPaginate.scss'

const Pagination = ({value, onChangePage}) => {
    return (
        <>
            <ReactPaginate
                className="react-paginate"
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageCount={3}
                forcePage={value - 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default Pagination;