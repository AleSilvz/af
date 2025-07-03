import { createHashRouter } from "react-router-dom";
import App from "../App";
import Screenlogin from "../pages/login/login";
import ScreenSingUP from "../pages/sing up/singUp";
import SreenAccount from "../pages/account/account";
import Compras from "../pages/pages menu/compras";

const Router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Screenlogin />,
  },
  {
    path: "/singup",
    element: <ScreenSingUP />,
  },
  {
    path: "/account",
    element: <SreenAccount />,
  },
  {
    path: "/compras",
    element: <Compras />,
  },
]);

export { Router };
