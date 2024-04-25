import axios from "axios";
import { useId, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_API } from "../../../constants/api_constant";
import { MAIN, SIGN_UP } from "../../../constants/page_constant";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextField from "../../components/TextField";

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const formData = new FormData();
            formData.append("id", id);
            formData.append("password", password);

            const response = await axios.post(
                API_BASE_URL + LOGIN_API,
                formData
            )

            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            localStorage.setItem("authority", response.data.authority);

            navigate(MAIN);
        }catch(error) {
            setError("아이디 또는 비밀번호가 잘못되었습니다");
        }
    }

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
                value={id}
                onChange={(e) => setId(e.target.value)}
                />
                <TextField
                title="비밀번호"
                type="password"
                placeholder="비밀번호 입력"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{color:'red'}}>{error}</p>}
                <button type="submit" className="btn btn-primary">로그인</button>
                <Link className="btn btn-primary" to={SIGN_UP}>회원가입</Link>
            </form>
        </div>
        <Footer/>
        </>
    )
}