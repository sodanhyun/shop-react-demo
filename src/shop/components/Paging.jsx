import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Paging({loadPage, totalPages, maxPageNum, pageNum}) {
    const [pageRange, setPageRange] = useState([]);

    const initStates = () => {
        const startVal = Math.floor(pageNum/maxPageNum)*maxPageNum + 1;
        const endVal = (totalPages == 0) ? 1 : startVal + (maxPageNum - 1) < totalPages ? startVal + (maxPageNum - 1) : totalPages;
        setPageRange(getIntegerArray(startVal, endVal));
    };

    const getIntegerArray = (start, end) => {
        const result = [];
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
        return result;
    }

    useEffect(() => {
        initStates();
    }, [totalPages, maxPageNum, pageNum]);

    return (
        <div>
            <ul className="pagination justify-content-center">
                <li className= {"page-item" + (pageNum===0 ? ' disabled' : '')}>
                    <Link onClick={() => loadPage(pageNum-1)} aria-label='Previous' className="page-link">
                        <span aria-hidden='true'>이전</span>
                    </Link>
                </li>

                {pageRange.map((num) => 
                    <li key={num} className= {"page-item" + (pageNum == (num-1) ? ' active' : '')}>
                        <a onClick={() => loadPage(num-1)} className="page-link">{num}</a>
                    </li>
                )}

                <li className= {"page-item" + ((pageNum+1)===totalPages ? ' disabled' : '')}>
                    <Link onClick={() => loadPage(pageNum+1)} aria-label='Previous' className="page-link">
                        <span aria-hidden='true'>다음</span>
                    </Link>
                </li>

            </ul>
        </div>
    )
}