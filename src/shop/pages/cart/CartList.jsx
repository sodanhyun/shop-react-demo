import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/CartList.css";
import fetcher from "../../../fetcher";
import { CART, CART_ITEM, CART_ORDER } from "../../../constants/api_constant";

export default function CartList() {
    const [cartItems, setCartItems] = useState([]);
    const [checkedItemIds, setCheckedItemIds] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const totalPrice = useMemo(() => function(){
        let totalPrice = 0;
        checkedItemIds.forEach((id) => {
            const cartItem = cartItems.find((e) => e.cartItemId === id);
            totalPrice += cartItem.count * cartItem.price;
        });
        return totalPrice;
    }(), [cartItems, checkedItemIds]);

    const orders = async () => {
        let dataList = new Array();
        checkedItemIds.forEach((e) => {
            const data = { cartItemId: e };
            dataList.push(data);
        });
        const paramData = { cartOrderDtoList: dataList };

        try{
            const response = await fetcher.post(
                CART_ORDER,
                JSON.stringify(paramData),
                {headers: {
                    "Content-Type": "application/json",
                }}
            )
            alert(response.data);
            setCheckedItemIds([]);
            setCheckAll(false);
            loadCartList();
        }catch(error) {
            alert(error.response.data);
        }
    }

    const checkAllfunc = (check) => {
        setCheckAll(check);
        if(check) {
            cartItems.forEach((e) => {
                if(!checkedItemIds.find((el) => el === e.cartItemId)) {
                    setCheckedItemIds((prev) => [...prev, e.cartItemId]);
                }
            })
            return;
        }
        setCheckedItemIds([]);
    }

    const loadCartList = async () => {
        try{
            const response = await fetcher.get(CART);
            setCartItems(response.data);
        }catch(error) {
            alert(error.response.data);
        }
    };

    useEffect(() => {
        loadCartList();
    }, []);

    return(
        <>
        <Header/>
        <div className="content content-mg">
            <h2 className="mb-4">
                장바구니 목록
            </h2>
            <div>
                <table className="table">
                    <colgroup>
                        <col width="15%"/>
                        <col width="70%"/>
                        <col width="15%"/>
                    </colgroup>
                    <thead>
                    <tr className="text-center">
                        <td>
                            <input 
                            type="checkbox" 
                            checked={checkAll}
                            onChange={() => checkAllfunc(!checkAll)}/> 전체선택
                        </td>
                        <td>상품정보</td>
                        <td>상품금액</td>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems?.map((cartItem) => 
                        <CartItem
                            key={cartItem.cartItemId}
                            cartItem={cartItem}
                            setCartItems={setCartItems}
                            checkedItemIds={checkedItemIds}
                            setCheckAll={setCheckAll}
                            setCheckedItemIds={setCheckedItemIds}
                        />
                    )}
                    </tbody>
                </table>

                <h2 className="text-center">
                    총 주문 금액 : <span className="text-danger">{totalPrice}원</span>
                </h2>

                <div className="text-center mt-3">
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => orders()}>주문하기</button>
                </div>
                
            </div>
        </div>
        <Footer/>
        </>
    )
}

function CartItem({cartItem, setCartItems, checkedItemIds, setCheckAll, setCheckedItemIds}) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const updateCount = async (id, count) => {
        try{
            await fetcher.patch(CART_ITEM + `/${id}?count=${count}`);
            setCartItems(prev => {
                prev.find((el) =>  {
                    if(el.cartItemId === id) {
                        el.count = count;
                    }
                });
                return [...prev];
            });
        }catch(error) {
            alert(error.response.data);
        }
    };

    const deleteCartItem = async (id) => {
        try{
            await fetcher.delete(CART_ITEM + `/${id}`);
            setCheckedItemIds((prev) => prev.filter((e) => e !== id));
            setCartItems((prev) => prev.filter((e) => e.cartItemId !== id));
        }catch(error) {
            alert(error.response.data);
        }
    }

    const checkCartItem = (id) => {
        setCheckAll(false);
        if(checkedItemIds.find((e) => e === id)) {
            setCheckedItemIds((prev) => prev.filter((e) => e !== id));
            return;
        }
        setCheckedItemIds((prev) => [...prev, id]);
    }

    const isChecked = (id) => {
        return !!checkedItemIds.find((e) => e === id)
    }

    return (
        <tr key={cartItem.cartItemId}>
            <td className="text-center align-middle">
                <input 
                type="checkbox" 
                name="cartChkBox" 
                checked={isChecked(cartItem.cartItemId)}
                onChange={() => checkCartItem(cartItem.cartItemId)}
                />
            </td>
            <td className="d-flex">
                <div className="repImgDiv align-self-center">
                    <img 
                    src={API_BASE_URL + cartItem.imgUrl} 
                    className = "rounded repImg" 
                    alt={cartItem.itemNm}
                    />
                </div>
                <div className="align-self-center">
                    <span className="fs24 font-weight-bold">{cartItem.itemNm}</span>
                    <div className="fs18 font-weight-light">
                        <span className="input-group mt-2">
                            <span className="align-self-center mr-2">{cartItem.price}원</span>
                            <input
                            type="number" 
                            min="1"
                            className="form-control mr-2" 
                            value={cartItem.count}
                            onChange={(e) => updateCount(cartItem.cartItemId, e.target.value)}
                            />
                            <button type="button" className="close" aria-label="Close">
                                <span onClick={() => deleteCartItem(cartItem.cartItemId)}>&times;</span>
                            </button>
                        </span>
                    </div>
                </div>
            </td>
            <td className="text-center align-middle">
                <span>{cartItem.price*cartItem.count}원</span>
            </td>
        </tr>
    );
}