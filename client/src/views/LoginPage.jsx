import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleFacebookLogin, handleGoogleLogin, handleLogin } from "../store/actions/userAuthCreator";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
export const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({ ...input, [name]: value });
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    dispatch(handleLogin({ email: input.email, password: input.password })).then(() => {
      navigate("/resendVerification");
    });
  };

  const responseGoogle = async (credentialResponse) => {
    dispatch(handleGoogleLogin(credentialResponse)).then(() => {
      navigate("/");
    });
  };

  const responseFacebook = async (response) => {
    dispatch(handleFacebookLogin(response)).then(() => {
      navigate("/");
    });
  };

  return (
    <section id="signup-section" className="flex justify-center items-center h-screen bg-white">
      <div className="min-h-screen bg-white-50 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="w-96 p-6 shadow-lg bg-white rounded-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>

            <form onSubmit={submitLogin} id="signup-form" className="mb-0 space-y-6 mt-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    value={input.email}
                    id="email-signup"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    value={input.password}
                    id="password-signup"
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500"
                  />
                </div>
              </div>
              <div>
                {/* Example of redirecting using Link */}
                <Link to={"/register"} className="block text-sm font-medium text-blue-700">
                  Don't have an account yet?
                </Link>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="border-2 border-gray-500 bg-gray-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-500 font-semibold">
                  Login
                </button>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-700 text-center">Or</p>
              </div>
              <div className="py-2">
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <FacebookLogin appId="YOUR_FACEBOOK_APP_ID" autoLoad={false} fields="name,email,picture" callback={responseFacebook} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
