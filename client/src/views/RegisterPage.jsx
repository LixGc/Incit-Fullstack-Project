import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleRegister } from "../store/actions/userAuthCreator";
export const RegisterPage = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({ ...input, [name]: value });
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    dispatch(handleRegister({ username: input.username, email: input.email, password: input.password, password2: input.password2 })).then(() => {
      navigate("/resendVerification");
    });
  };

  return (
    <section id="signup-section" className="flex justify-center items-center h-screen bg-white">
      <div className="min-h-screen bg-white-50 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="w-96 p-6 shadow-lg bg-white rounded-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>

            <form onSubmit={submitRegister} id="signup-form" className="mb-0 space-y-6 mt-6" action="#">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    value={input.username}
                    id="name-signup"
                    name="username"
                    type="text"
                    required
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500"
                  />
                </div>
              </div>

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
                    type="email"
                    required
                    autoComplete="email"
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
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                  Re-enter password
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    value={input.password2}
                    id="password-signup"
                    name="password2"
                    type="password"
                    required
                    autoComplete="password"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500"
                  />
                </div>
              </div>

              <div>
                {/* Example of redirecting using Link */}
                <Link to={"/login"} className="block text-sm font-medium text-blue-700">
                  Already have an account?
                </Link>
              </div>

              <div className="mt-3 py-2">
                <button
                  type="submit"
                  className="border-2 border-gray-500 bg-gray-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-500 font-semibold">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
