import axios from "axios";
import { useId, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_API } from "../../../constants/api_constant";
import { LOGIN_HANDLER, MAIN, SIGN_UP } from "../../../constants/page_constant";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextField from "../../components/TextField";
import googleSignIn from "./googleSignIn.png";
import kakaoSignIn from "./kakao.png";

export default function Login() {
    const [data, setData] = useState({
        id: "",
        address: ""
    });
    const [error, setError] = useState("");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/google?redirect_uri=${LOGIN_HANDLER}&type=google`
    const KAKAO_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${LOGIN_HANDLER}&type=kakao`
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(API_BASE_URL + LOGIN_API, data)
            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("authority", response.data.authority);
            navigate(MAIN);
        }catch(error) {
            setError("아이디 또는 비밀번호가 잘못되었습니다");
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
            <form role="form" onSubmit={handleLogin}>
                <TextField
                title="이메일 주소"
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
                {error && <p style={{color:'red'}}>{error}</p>}
                <button type="submit" className="btn btn-primary">로그인</button>
                <Link className="btn btn-primary" to={SIGN_UP}>회원가입</Link>
            </form>
            <div className="mt-2">
                <a href={GOOGLE_AUTH_URL}>
                    <img src={googleSignIn}/>
                </a>
            </div>
            <div className="mt-2">
                <a href={KAKAO_AUTH_URL}>
                    <img src={kakaoSignIn}/>
                </a>
            </div>
        </div>
        <Footer/>
        </>
    )
}