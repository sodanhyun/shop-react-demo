import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ADMIN_ITEMS } from "../../../constants/api_constant";
import fetcher from "../../../fetcher";
import { Link, useNavigate } from "react-router-dom";
import Paging from "../../components/Paging";
import { ITEM_UPDATE_FORM, PAGE_403 } from "../../../constants/page_constant";

export default function ItemMng() {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const navigate = useNavigate();

    const loadPage = async (page, data) => {
        const searchData = {
            searchDateType: data ? data.searchDateType : "all",
            searchSellStatus: data ? data.searchSellStatus : null,
            searchBy: data ? data.searchBy : "itemNm",
            searchQuery: data ? data.searchQuery : ""
        };
        try{
            const response = await fetcher.post(
                ADMIN_ITEMS + `/${page}`,
                searchData
            );
            setItems(response.data.page.content);
            setTotalPages(response.data.page.totalPages);
            setPageNum(response.data.page.number);
            setMaxPageNum(response.data.maxPageNum);
        }catch(error) {
            alert(error.response.data);
        }
    }

    useEffect(() => {
        if(localStorage.getItem("authority") !== "ROLE_ADMIN") {
            navigate(PAGE_403);
        }
        loadPage(0);
    }, []);

    return (
        <>
        <Header/>

        <div className="content">
            <Items items={items} />
        </div>

        <PageSearchBar 
        loadfunc={loadPage} 
        totalPages={totalPages}
        maxPageNum={maxPageNum}
        pageNum={pageNum}
        />

        <Footer/>
        </>
    )
}

function Items({items}) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <td>상품아이디</td>
                    <td>상품명</td>
                    <td>상태</td>
                    <td>등록자</td>
                    <td>등록일</td>
                </tr>
            </thead>
            <tbody>
                {items?.map((item) => 
                    <Item 
                    key={item.id}
                    item={item}
                    />
                )}
            </tbody>
        </table>
    )
} 
function Item({item}) {
    return(
        <tr>
            <td>{item.id}</td>
            <td>
                <Link to={ITEM_UPDATE_FORM + `/${item.id}`}>{item.itemNm}</Link>
            </td>
            <td>{item.itemSellStatus == "SELL" ? "판매중" : "품절"}</td>
            <td>{item.createdBy}</td>
            <td>{item.regTime}</td>
        </tr>
    )
}

function PageSearchBar({loadfunc, totalPages, maxPageNum, pageNum}) {
    const [searchDateType, setSearchDateType] = useState("all");
    const [searchSellStatus, setSearchSellStatus] = useState(null);
    const [searchBy, setSearchBy] = useState("itemNm");
    const [searchQuery, setSearchQuery] = useState("");

    const search = (page) => {
        const searchData = {
            searchDateType: searchDateType,
            searchSellStatus: searchSellStatus,
            searchBy: searchBy,
            searchQuery: searchQuery
        };
        loadfunc(page, searchData);
    }

    return (
        <>
        <Paging
        loadPage={search}
        totalPages={totalPages}
        maxPageNum={maxPageNum}
        pageNum={pageNum}
        />
        <div className="form-inline justify-content-center">
            <SearchSelect
            value={searchDateType}
            onchangefunc={setSearchDateType}
            >
                <option value="all">전체기간</option>
                <option value="1d">1일</option>
                <option value="1w">1주</option>
                <option value="1m">1개월</option>
                <option value="6m">6개월</option>
            </SearchSelect>

            <SearchSelect
            value={!searchSellStatus && ""}
            onchangefunc={setSearchSellStatus}
            >
                <option value="">판매상태(전체)</option>
                <option value="SELL">판매</option>
                <option value="SOLD_OUT">품절</option>
            </SearchSelect>

            <SearchSelect
            value={searchBy}
            onchangefunc={setSearchBy}
            >
                <option value="itemNm">상품명</option>
                <option value="createdBy">등록자</option>
            </SearchSelect>

            <input 
            type="text" 
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button onClick={() => search(0)} className="btn btn-primary">검색</button>
        </div>
        </>
        
    )
}

function SearchSelect({children, value, onchangefunc}) {
    return (
        <select 
        className="form-control" 
        style={{width: 'auto'}}
        value={value}
        onChange={(e) => onchangefunc(e.target.value)}
        >
        {children}
        </select>
    )
}