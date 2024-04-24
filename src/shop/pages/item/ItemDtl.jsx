import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/ItemDtl.css";
import { useEffect, useState } from "react";
import fetcher from "../../../fetcher";
import { CART, ITEM, ORDER } from "../../../constants/api_constant";

export default function ItemDtl() {
    const [item, setItem] = useState({});
    const [count, setCount] = useState(0);
    const params = useParams();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const addCart = async () => {
        const data = {
            itemId: item.id,
            count: count
        }

        try{
            const response = await fetcher.post(
                CART, 
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            alert(response.data);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const order = async () => {
        const data = {
            itemId: item.id,
            count: count
        }

        try{
            const response = await fetcher.post(
                ORDER,
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            alert(response.data);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const loadDetail = async (param) => {
        try{
            const response = await fetcher.get(
                ITEM + `/${param}`
            )
            setItem(response.data);
        }catch(error) {
            alert(error.response.data);
        }
    }

    useEffect(() => {
        loadDetail(params.id);
    },[]);

    return(
        <>
        <Header/>
        <div style={{marginLeft: '25%', marginRight: '25%'}}>
            <div className="d-flex">
                <div className="repImgDiv">
                    {item.itemImgDtoList && <img src={API_BASE_URL + item.itemImgDtoList[0].imgUrl} className = "rounded repImg"/>}
                </div>
                <div className="wd50">
                    {item.itemSellStatus == "SELL" ? (
                        <span className="badge badge-primary mgb-15">
                            판매중
                        </span>
                    ) : (
                        <span className="badge btn-danger mgb-15" >
                            품절
                        </span>
                    )}
                    <div className="h4">{item.itemNm}</div>
                    <hr className="my-4"/>

                    <div className="text-right">
                        <div className="h4 text-danger text-left">
                            <span>{item.price}</span>원
                        </div>
                        <div className="input-group w-50">
                            <div className="input-group-prepend">
                                <span className="input-group-text">수량</span>
                            </div>
                            <input 
                            type="number" 
                            className="form-control" 
                            min="1"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            />
                        </div>
                    </div>
                    <hr className="my-4"/>

                    <div className="text-right mgt-50">
                        <h5>결제 금액</h5>
                        <h3 name="totalPrice" className="font-weight-bold">{item.price*count}</h3>
                    </div>
                    {item.itemSellStatus === "SELL" ? (
                        <div className="text-right">
                            <button type="button" className="btn btn-light border border-primary btn-lg" onClick={() => addCart()}>장바구니 담기</button>
                            <button type="button" className="btn btn-primary btn-lg" onClick={() => order()}>주문하기</button>
                        </div>
                    ) : (
                        <div className="text-right">
                            <button type="button" className="btn btn-danger btn-lg">품절</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="jumbotron jumbotron-fluid mgt-30">
                <div className="container">
                    <h4 className="display-5">상품 상세 설명</h4>
                    <hr className="my-4"/>
                    <p className="lead">{item.itemDetail}</p>
                </div>
            </div>
            
            {item.itemImgDtoList?.map((itemImg) => 
                <div className="text-center">
                    <img src={API_BASE_URL + itemImg.imgUrl} className="rounded mgb-15" width="800"/>
                </div>
            )}

        </div>
        <Footer/>
        </>
    )
}