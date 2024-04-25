import { useEffect, useState } from "react";
import { ORDER_CANCEL, ORDER_PAGE } from "../../../constants/api_constant";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Paging from "../../components/Paging";
import "../../css/OrderHist.css"
import fetcher from "../../../fetcher";

export default function OrderHist() {
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    

    const cancelOrder = async (id) => {
        try{
            const response = await fetcher.post(ORDER_CANCEL + `/${id}`);
            alert(response.data);
            loadPage(0);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const loadPage = async (page) => {
        try{
            const response = await fetcher.get(ORDER_PAGE + `/${page}`);
            setOrders(response.data.page.content);
            setTotalPages(response.data.page.totalPages);
            setPageNum(response.data.page.number);
            setMaxPageNum(response.data.maxPageNum);
        }catch(error) {
            alert(error.response.data);
        }
    }

    useEffect(() => {
        loadPage(0);
    }, []);

    return(
        <>
        <Header/>
        <div className="content content-mg">
            <h2 className="mb-4">구매 이력</h2>

            {orders?.map((order) => 
                <Order
                order={order}
                cancelfunc={cancelOrder}
                />
            )}

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

function Order({order, cancelfunc}) {
    return(
        <div>
            <div className="d-flex mb-3 align-self-center">
                <h4>{order.orderDate}</h4>
                <div className="ml-3">
                {order.orderStatus === "ORDER" ? (
                    <button type="button" className="btn btn-outline-secondary" onClick={() => cancelfunc(order.orderId)}>주문취소</button>
                ) : (
                    <h4>(취소 완료)</h4>
                )}
                </div>
            </div>
            <div className="card d-flex">
            {order.orderItemDtoList.map((orderItem) => 
                <OrderItem
                orderItem={orderItem}
                />
            )}
            </div>
        </div>
    )
}

function OrderItem({orderItem}) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return (
        <div className="d-flex mb-3">
            <div className="repImgDiv">
                <img src={API_BASE_URL + orderItem.imgUrl} className = "rounded repImg" alt={orderItem.itemNm}/>
            </div>
            <div className="align-self-center w-75">
                <span className="fs24 font-weight-bold">{orderItem.itemNm}</span>
                <div className="fs18 font-weight-light">
                    <span>{orderItem.orderPrice}원</span>
                    <span>{orderItem.count}개</span>
                </div>
            </div>
        </div>
    )
}