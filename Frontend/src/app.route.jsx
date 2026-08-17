import { createBrowserRouter } from "react-router-dom";
import Login from "./feature/auth/pages/login";
import Register from "./feature/auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <h1>welcome to home </h1>,
  }
]);