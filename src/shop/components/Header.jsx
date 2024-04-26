import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CART_LIST, ITEM_FORM, ITEM_MNG, LOGIN, MAIN, ORDER_HIST } from "../../constants/page_constant";
import Logout from "./auth/Logout";

export default function Header({...props}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authority, setAuthority] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if(props.mainSearch) {
            props.mainSearch(searchQuery);
            return;
        } 
        sessionStorage.setItem("searchQuery", searchQuery);
        navigate(MAIN);
    };

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("access_token"));
        setAuthority(localStorage.getItem("authority"));
    }, []);

    return(
        <>
        <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to={"/"}>Shop</Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {isLoggedIn && authority==="ROLE_ADMIN" &&
                        <><li className="nav-item">
                            <Link className="nav-link" to={ITEM_FORM}>상품 등록</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ITEM_MNG}>상품 관리</Link>
                        </li></>
                        }
                        {isLoggedIn &&
                        <><li className="nav-item">
                            <Link className="nav-link" to={CART_LIST}>장바구니</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ORDER_HIST}>구매이력</Link>
                        </li></>
                        }
                        {isLoggedIn ? (
                            <Logout>로그아웃</Logout>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to={LOGIN}>로그인</Link>
                            </li>
                        )}
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
                        <input 
                        className="form-control mr-sm-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>       
        </>
    )
}