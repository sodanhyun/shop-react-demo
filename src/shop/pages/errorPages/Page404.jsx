import { Link } from "react-router-dom";
import { MAIN } from "../constants/page_constant";

export default function Page404() {
    return(
        <>
        <h1>존재하지 않는 페이지 입니다</h1>
        <Link to={MAIN}>메인 페이지로 이동하시겠습니까?</Link>
        </>
    )
}