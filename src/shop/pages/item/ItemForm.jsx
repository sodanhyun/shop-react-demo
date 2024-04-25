import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/ItemForm.css";
import fetcher from "../../../fetcher";
import { ADMIN_ITEM_NEW } from "../../../constants/api_constant";
import { useNavigate } from "react-router-dom";
import { MAIN, PAGE_403 } from "../../../constants/page_constant";
import Button from "../../components/Button";
import InputSelect from "../../components/item/InputSelect";
import InputField from "../../components/item/InputField";
import InputArea from "../../components/item/InputArea";
import InputFile from "../../components/item/InputFile";

export default function ItemForm() {
    const [data, setData] = useState({
        itemSellStatus: "SELL",
        itemNm: "",
        price: 0,
        stockNumber: 0,
        itemDetail: ""
    });
    const [itemImages, setItemImages] = useState([]);
    const navigate = useNavigate();

    const handleSave = async (e) => {
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

    const checkExt = (fileName) => {
        const fileExt = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase(); // 확장자 추출
        if(fileExt != "jpg" && fileExt != "jpeg" && fileExt != "gif" && fileExt != "png" && fileExt != "bmp"){
            alert("이미지 파일만 등록이 가능합니다.");
            return false;
        }
        return true;
    }

    const attach = (target) => {
        const filename = target.value.substring(target.value.lastIndexOf("\\")+1);
        if(!checkExt(filename)) {
            return false;
        }
        target.nextSibling.innerText = filename;
        setItemImages(prev => [...prev, target.files[0]]);
    }

    const onChangeHandler = (e) => {
        const {value, name} = e.target;
        setData({ ...data, [name]: value})
    };

    useEffect(() => {
        if(localStorage.getItem("authority") !== "ROLE_ADMIN") {
            navigate(PAGE_403);
        }
    }, []);

    return (
        <>
        <Header/>
        <div className="content">
            <p className="h2">상품 등록</p>

            <InputSelect
            name="itemSellStatus"
            value={data.itemSellStatus}
            onChange={onChangeHandler}>
                <option value="SELL">판매중</option>
                <option value="SOLD_OUT">품절</option>
            </InputSelect>
            <InputField
            title="상품명"
            placeholder="상품명을 입력해주세요"
            required
            name="itemNm"
            value={data.itemNm}
            onChange={onChangeHandler}
            />
            <InputField
            title="가격"
            type="number"
            placeholder="상품의 가격을 입력해주세요"
            required
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            />
            <InputField
            title="재고"
            type="number"
            placeholder="상품의 재고를 입력해주세요"
            required
            name="stockNumber"
            value={data.stockNumber}
            onChange={onChangeHandler}
            />
            <InputArea
            title="상품 상세 내용"
            required
            name="itemDetail"
            value={data.itemDetail}
            onChange={onChangeHandler}
            />

            <div className="form-group">
            {Array(5).fill(0).map((_, index) => 
                <InputFile
                    key={index}
                    title={`상품이미지${index}`}
                    onChange={(e) => attach(e.target)}
                />
            )}
            </div>
            
            <div style={{textAlign: 'center'}}>
                <Button 
                    onclick={handleSave}
                    title="저장"
                />
            </div>
        </div>
        <Footer/>
        </>
    )
}