import { createBrowserRouter, redirect } from "react-router-dom";
import { RegisterPage } from "../views/RegisterPage";
import { LoginPage } from "../views/LoginPage";
import { ResendVerificationPage } from "../views/ResendVerificationPage";
import { Layout } from "../components/Layout";
import { Dashboard } from "../views/Dashboard";
import { VerifyAccount } from "../views/VerifyAndRedirectPage";

const router = createBrowserRouter([

  {
    path:'/register',
    element: <RegisterPage/>,
    loader: () => {
      if(localStorage.access_token){
        throw redirect('/')
      }
      return null
    }
  },
  {
    path:'/login',
    element: <LoginPage/>,
    loader: () => {
      if(localStorage.access_token){
        throw redirect('/')
      }
      return null
    }
  },
  {
    path:'/resendVerification',
    element: <ResendVerificationPage/>,
    loader: () => {
      if(!localStorage.email){
        throw redirect('/login')
      }
      return null
    }
  },
  {
    path:'/verifyAccount',
    element: <VerifyAccount/>,
  },
  {
    element: <Layout/>,
    loader: () => {
      if(!localStorage.access_token && !localStorage.verified){
        throw redirect('/login')
      }
      return null
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      }
    ],
  },
]);

export default router;