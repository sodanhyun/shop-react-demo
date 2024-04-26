import { useNavigate } from "react-router-dom";
import fetcher from "../../../fetcher";
import { LOGOUT_API } from "../../../constants/api_constant";
import { LOGIN } from "../../../constants/page_constant";

export default function Logout({children}) {
    const refreshToken = localStorage.getItem("refresh_token");
    const navigate = useNavigate();

    const logoutHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("refreshToken", refreshToken);

        const response = await fetcher.post(
            LOGOUT_API,
            formData
        )
        alert(response.data);
        localStorage.clear();
        navigate(LOGIN);
    }

    return(
        <li className="nav-item">
            <a href="#" className="nav-link" onClick={logoutHandler}>{children}</a>
        </li>
    )
}