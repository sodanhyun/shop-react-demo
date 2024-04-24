import { MAIN } from "../constants/page_constant";
import { Link } from "react-router-dom";

export default function Page403() {
    return(
        <>
        <h1>해당 페이지 접근 권한이 없습니다</h1>
        <Link to={MAIN}>메인 페이지로 이동하시겠습니까?</Link>
        </>
    )
}