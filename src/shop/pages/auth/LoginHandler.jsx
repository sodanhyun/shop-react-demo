import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../../constants/page_constant";

export default function LoginHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URL(window.location.href).searchParams;
        const accessToken = searchParams.get("access_token");
        const authority = searchParams.get("authority");

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("authority", authority);

        navigate(MAIN);
    }, []);

    return(
    <div>
        <p className="text-xl font-bold mb-4">로그인 중입니다.</p>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
    </div>
    )
}