import { Routes, Route } from "react-router-dom";
import {
  MAIN,
  SIGN_UP,
  LOGIN,
  PAGE_403,
  PAGE_404,
  CART_LIST,
  ORDER_HIST,
  ITEM_FORM,
  ITEM_MNG,
  ITEM_DTL,
  ITEM_UPDATE_FORM,
  LOGIN_HANDLER
} from "./constants/page_constant";
import Page403 from "./shop/pages/errorPages/Page403";
import Page404 from "./shop/pages/errorPages/Page404";
import Main from "./shop/pages/Main";
import Login from "./shop/pages/auth/Login";
import Signup from "./shop/pages/auth/Signup";
import CartList from "./shop/pages/cart/CartList";
import OrderHist from "./shop/pages/order/OrderHist";
import ItemForm from "./shop/pages/item/ItemForm";
import ItemMng from "./shop/pages/item/ItemMng";
import ItemDtl from "./shop/pages/item/ItemDtl";
import ItemUpdateForm from "./shop/pages/item/ItemUpdateForm";
import LoginHandler from "./shop/pages/auth/LoginHandler";

function App() {
  return (
    <>
      <Routes>
        <Route path={MAIN} element={<Main/>} />
        <Route path={LOGIN} element={<Login/>} />
        <Route path={SIGN_UP} element={<Signup/>} />
        <Route path={LOGIN_HANDLER} element={<LoginHandler/>}/>
        <Route path={CART_LIST} element={<CartList/>}/>
        <Route path={ORDER_HIST} element={<OrderHist/>}/>
        <Route path={ITEM_FORM} element={<ItemForm/>}/>
        <Route path={ITEM_UPDATE_FORM + '/:id'} element={<ItemUpdateForm/>}/>
        <Route path={ITEM_MNG} element={<ItemMng/>}/>
        <Route path={ITEM_DTL + '/:id'} element={<ItemDtl/>}/>
        <Route path={PAGE_403} element={<Page403/>}></Route>
        <Route path={PAGE_404} element={<Page404/>}></Route>
      </Routes>
    </>
  );
}

export default App;
