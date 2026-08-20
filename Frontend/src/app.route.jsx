import { createBrowserRouter } from "react-router-dom";
import Login from "./feature/auth/pages/login";
import Register from "./feature/auth/pages/Register";
import Protectedroute from "./feature/auth/component/Protectedroute";
import Home from "./feature/interview/pages/Home";
import Interview from "./feature/interview/pages/Interview";


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
    element: (
      <Protectedroute>
       <Home/>
      </Protectedroute>
    )
  },
  {
     path: "/interview/:interviewid",
    element: (
      <Protectedroute>
       <Interview/>
      </Protectedroute>
    )
  }
]);