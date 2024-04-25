import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_API } from "../../../constants/api_constant";
import { LOGIN } from "../../../constants/page_constant";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import TextField from "../../components/TextField";

export default function Signup() {
    const [data, setData] = useState({
        id: "",
        name: "",
        password: "",
        address: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(
                API_BASE_URL + SIGN_UP_API,
                data
            )
            alert(response.data);
            navigate(LOGIN);
        }catch(error) {
            setError(error.response.data);
        }
    }

    const onChangeHandler = (e) => {
        const {value, name} = e.target;
        setData({ ...data, [name]: value})
    };

    return(
        <>
        <Header/>
        <div className="content">
            <form role="form" onSubmit={handleSignup}>
                <TextField
                title="이름"
                placeholder="이름을 입력해주세요"
                required
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                />
                <TextField
                title="이메일주소"
                type="email" 
                placeholder="이메일을 입력해주세요"
                required
                name="id"
                value={data.id}
                onChange={onChangeHandler}
                />
                <TextField
                title="비밀번호"
                type="password"
                placeholder="비밀번호 입력"
                required
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                />
                <TextField
                title="주소"
                placeholder="주소를 입력해주세요"
                required
                name="address"
                value={data.address}
                onChange={onChangeHandler}
                />
                {error && <p style={{color:'red'}}>{error}</p>}
                <div style={{textAlign: 'center'}}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}