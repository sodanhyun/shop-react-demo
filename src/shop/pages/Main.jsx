import "../css/Main.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link, useLocation, useParams } from "react-router-dom"
import { ITEM_DTL, MAIN } from "../../constants/page_constant"
import { useEffect, useState } from "react"
import fetcher from "../../fetcher"
import { MAIN_INIT_DATA_API } from "../../constants/api_constant"
import Paging from "../components/Paging"

export default function Main() {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const loadPage = async (page) => {
        try{
            const response = await fetcher.get(
                MAIN_INIT_DATA_API + `/${page}` + "?searchQuery=" + searchQuery
            )
            setItems(response.data.page.content);
            setTotalPages(response.data.page.totalPages);
            setPageNum(response.data.page.number);
            setMaxPageNum(response.data.maxPageNum);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const mainSearch = (keyword) => {
        setSearchQuery(keyword);
    }

    useEffect(() => {
        if(sessionStorage.getItem("searchQuery")) {
            setSearchQuery(sessionStorage.getItem("searchQuery"));
            sessionStorage.removeItem("searchQuery");
        }
        loadPage(0);
    }, [searchQuery]);

    return(
        <>
        <Header
            mainSearch={mainSearch}
        />
        <div className="content">
            <div id="carouselControls" className="carousel slide margin" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active item">
                        <img className="d-block w-100 banner" src="https://user-images.githubusercontent.com/13268420/112147492-1ab76200-8c20-11eb-8649-3d2f282c3c02.png" alt="First slide"/>
                    </div>
                </div>
            </div>

            {searchQuery && 
                <div class="center">
                    <p class="h3 font-weight-bold">{searchQuery}검색 결과</p>
                </div>
            }

            <div className="row" style={{width: '95%'}}>
                {items.map((item) => 
                    <div className="col-md-4 margin">
                        <div className="card">
                            <Link to={ITEM_DTL + `/${item.id}`} className="text-dark">
                                <img src={API_BASE_URL + item.imgUrl} className="card-img-top" alt={item.itemNm} height="400"/>
                                <div className="card-body">
                                    <h4 className="card-title">{item.itemNm}</h4>
                                    <p className="card-text">{item.itemDetail}</p>
                                    <h3 className="card-title text-danger">{item.price}원</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <Paging
                loadPage={loadPage}
                totalPages={totalPages}
                maxPageNum={maxPageNum}
                pageNum={pageNum}
            />

            </div>
            <Footer/>
        </>
    )
}