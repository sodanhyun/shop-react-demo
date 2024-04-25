import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_API } from "../../../constants/api_constant";
import { LOGIN } from "../../../constants/page_constant";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import TextField from "../../components/TextField";

export default function Signup() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("password", password);
            formData.append("address", address);

            const response = await axios.post(
                API_BASE_URL + SIGN_UP_API,
                formData
            )

            alert(response.data);
            navigate(LOGIN);
        }catch(error) {
            setError(error.response.data);
        }
    }

    return(
        <>
        <Header/>
        <div className="content">
            <form role="form" onSubmit={handleSignup}>
                <TextField
                title="이름"
                placeholder="이름을 입력해주세요"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <TextField
                title="이메일주소"
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
                <TextField
                title="주소"
                placeholder="주소를 입력해주세요"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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