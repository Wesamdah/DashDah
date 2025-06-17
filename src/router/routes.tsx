import { createBrowserRouter } from "react-router-dom";
import Auth from "../Components/Auth";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);
