import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/ItemForm.css";
import fetcher from "../../../fetcher";
import { ADMIN_ITEM, ITEM } from "../../../constants/api_constant";
import { useNavigate, useParams } from "react-router-dom";
import { MAIN, PAGE_403 } from "../../../constants/page_constant";
import Button from "../../components/Button";
import InputSelect from "../../components/item/InputSelect";
import InputArea from "../../components/item/InputArea";
import InputFile from "../../components/item/InputFile";
import InputField from "../../components/item/InputField";

export default function ItemUpdateForm() {
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

            const response = await fetcher.patch(ADMIN_ITEM, formData);
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
        loadItemDtl(params.id);
    }, []);

    return (
        <>
        <Header/>
        <div className="content">
            <p className="h2">상품 등록</p>

            <InputSelect
            value={itemSellStatus}
            onChange={(e) => setItemSellStatus(e.target.value)}>
                <option value="SELL">판매중</option>
                <option value="SOLD_OUT">품절</option>
            </InputSelect>

            <InputField
            title="상품명"
            placeholder="상품명을 입력해주세요"
            required
            value={itemNm}
            onChange={(e) => setItemNm(e.target.value)}
            />

            <InputField
            title="가격"
            type="number"
            placeholder="상품의 가격을 입력해주세요"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />

            <InputField
            title="재고"
            type="number"
            placeholder="상품의 재고를 입력해주세요"
            required
            value={stockNumber}
            onChange={(e) => setStockNumber(e.target.value)}
            />

            <InputArea
            title="상품 상세 내용"
            required
            value={itemDetail}
            onChange={(e) => setItemDetail(e.target.value)}
            />

            <div className="form-group">
            {itemImgDtoList?.map((itemImgDto, index) => 
                <InputFile
                    key={itemImgDto.id}
                    title={itemImgDto ? itemImgDto.oriImgName : `상품이미지${index}`}
                    onChange={(e) => attach(e.target, itemImgDto.id)}
                />
            )}
            </div>
            
            <div style={{textAlign: 'center'}}>
            <Button 
                onclick={handleUpdate}
                title="수정"
            />
            </div>
        </div>
        <Footer/>
        </>
    )
}