import { createBrowserRouter, redirect } from "react-router-dom";
import { RegisterPage } from "../views/RegisterPage";
import { LoginPage } from "../views/LoginPage";
import { ResendVerificationPage } from "../views/ResendVerificationPage";
import { Layout } from "../components/Layout";
import { Dashboard } from "../views/Dashboard";
import { VerifyAccount } from "../views/VerifyAndRedirectPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      //If user already have access token and already verified then redirect to dashboard
      if (localStorage.access_token && localStorage.verified === "true") {
        throw redirect("/");
      //If user have access token but isn't verified then redirect to resend verification page
      } else if (localStorage.access_token || localStorage.verified === "false") {
        throw redirect("/resendVerification");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      //If user have access token but isn't verified then redirect to resend verification page
      if (localStorage.access_token && localStorage.verified === "false") {
        throw redirect("/resendVerification");
      //If user already have access token and already verified then redirect to dashboard
      } else if (localStorage.access_token && localStorage.verified === "true") {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/resendVerification",
    element: <ResendVerificationPage />,
    loader: () => {
      //If there's no user email redirect to login
      if (!localStorage.email) {
        throw redirect("/login");
      //If user already have access token and already verified then redirect to dashboard
      } else if (localStorage.access_token && localStorage.verified === "true") {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/verifyAccount",
    element: <VerifyAccount />,
  },
  {
    element: <Layout />,
    loader: () => {
      //If user don't have access token and isn't verified then redirect login page
      if (!localStorage.access_token || localStorage.verified !== "true") {
        throw redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
