import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = "87973030685-3mlll838f2nmrj2445nlidjo9v77btv2.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>
);