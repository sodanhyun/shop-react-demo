import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/ItemForm.css";
import fetcher from "../../../fetcher";
import { ADMIN_ITEM, ADMIN_ITEM_NEW, ITEM } from "../../../constants/api_constant";
import { useNavigate, useParams } from "react-router-dom";
import { MAIN, PAGE_403 } from "../../../constants/page_constant";

export default function ItemForm() {
    const params = useParams();
    const [itemSellStatus, setItemSellStatus] = useState("SELL");
    const [id, setId] = useState(null);
    const [itemNm, setItemNm] = useState("");
    const [price, setPrice] = useState(0);
    const [stockNumber, setStockNumber] = useState(0);
    const [itemDetail, setItemDetail] = useState("");
    const [itemImages, setItemImages] = useState([]);
    const [itemImgDtoList, setItemImgDtoList] = useState([]);
    const [itemImgIds, setItemImgIds] = useState([]);
    const navigate = useNavigate();

    const loadItemDtl = async (itemId) => {
        try{
            const response = await fetcher.get(ITEM + `/${itemId}`);
            setId(response.data.id);
            setItemNm(response.data.itemNm);
            setPrice(response.data.price);
            setItemDetail(response.data.itemDetail);
            setStockNumber(response.data.stockNumber);
            setItemSellStatus(response.data.itemSellStatus);
            setItemImgDtoList(response.data.itemImgDtoList);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const handleSave = async (e) => {
        const data = {
            itemSellStatus: itemSellStatus,
            itemNm: itemNm,
            price: price,
            stockNumber: stockNumber,
            itemDetail: itemDetail
        }
        
        try{
            const formData = new FormData();
            formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}));
            for(let i=0;  i<itemImages.length; i++) {
                formData.append("itemImgFile", itemImages[i]);
            }

            const response = await fetcher.post(ADMIN_ITEM_NEW, formData);

            alert(response.data);
            navigate(MAIN);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const handleUpdate = async (e) => {
        const data = {
            id: id,
            itemSellStatus: itemSellStatus,
            itemNm: itemNm,
            price: price,
            stockNumber: stockNumber,
            itemDetail: itemDetail,
            itemImgIds: itemImgIds
        }
        
        try{
            const formData = new FormData();
            formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}));

            for(let i=0;  i<itemImages.length; i++) {
                formData.append("itemImgFile", itemImages[i]);
            }

            const response = await fetcher.post(ADMIN_ITEM, formData);

            alert(response.data);
            navigate(MAIN);
        }catch(error) {
            alert(error.response.data);
        }
    }

    const checkExt = (fileName) => {
        const fileExt = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase(); // 확장자 추출
        if(fileExt != "jpg" && fileExt != "jpeg" && fileExt != "gif" && fileExt != "png" && fileExt != "bmp"){
            alert("이미지 파일만 등록이 가능합니다.");
            return false;
        }
        return true;
    }

    const attach = (target, id) => {
        const filename = target.value.substring(target.value.lastIndexOf("\\")+1);
        if(!checkExt(filename)) {
            return false;
        }
        target.nextSibling.innerText = filename;
        setItemImages(prev => [...prev, target.files[0]]);
        setItemImgIds(prev => [...prev, id]);
    }

    useEffect(() => {
        if(localStorage.getItem("authority") !== "ROLE_ADMIN") {
            navigate(PAGE_403);
        }
        if(params.id) {
            loadItemDtl(params.id);
        }
    }, []);

    return (
        <>
        <Header/>
        <div className="content">
            <p className="h2">
                상품 등록
            </p>

            <div className="form-group">
                <select 
                className="custom-select"
                required
                value={itemSellStatus}
                onChange={(e) => setItemSellStatus(e.target.value)}
                >
                    <option value="SELL">판매중</option>
                    <option value="SOLD_OUT">품절</option>
                </select>
            </div>

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">상품명</span>
                </div>
                <input 
                type="text" 
                className="form-control" 
                placeholder="상품명을 입력해주세요"
                required
                value={itemNm}
                onChange={(e) => setItemNm(e.target.value)}
                />
            </div>
            
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">가격</span>
                </div>
                <input 
                type="number" 
                className="form-control" 
                placeholder="상품의 가격을 입력해주세요"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">재고</span>
                </div>
                <input 
                type="number" 
                className="form-control" 
                placeholder="상품의 재고를 입력해주세요"
                required
                value={stockNumber}
                onChange={(e) => setStockNumber(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">상품 상세 내용</span>
                </div>
                <textarea 
                className="form-control" 
                aria-label="With textarea" 
                required
                value={itemDetail}
                onChange={(e) => setItemDetail(e.target.value)}
                ></textarea>
            </div>

            <div className="form-group">
            {itemImgDtoList[0] ? (
                itemImgDtoList?.map((itemImgDto, index) => 
                    <div className="custom-file img-div">
                        <input 
                        type="file" 
                        className="custom-file-input" 
                        name="itemImgFile"
                        onChange={(e) => attach(e.target, itemImgDto.id)}
                        />
                        <label className="custom-file-label">
                            {itemImgDto ? itemImgDto.oriImgName : `상품이미지${index}`}
                        </label>
                    </div>
                )
            ) : (
                Array(5).fill(0).map((_, index) => 
                    <div className="custom-file img-div">
                        <input 
                        type="file" 
                        className="custom-file-input" 
                        name="itemImgFile"
                        onChange={(e) => {
                            const filename = e.target.value.substring(e.target.value.lastIndexOf("\\")+1);
                            if(!checkExt(filename)) {
                                return;
                            }
                            e.target.nextSibling.innerText = filename;
                            setItemImages(prev => [...prev, e.target.files[0]]);
                        }}
                        />
                        <label className="custom-file-label">상품이미지{index}</label>
                    </div>
                )
            )}
            </div>
            
            <div style={{textAlign: 'center'}}>
            {id ? (
                <button onClick={() => handleUpdate()} className="btn btn-primary">수정</button>
            ) : (
                <button onClick={() => handleSave()} className="btn btn-primary">저장</button>
            )}
            </div>
        </div>
        <Footer/>
        </>
    )
}