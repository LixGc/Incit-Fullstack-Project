import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendVerification } from "../store/actions/userAuthCreator";
import { Loader } from "../components/Loader";
export const ResendVerificationPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const submitVerification = async (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(resendVerification()).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  };

  const changeAccount = async (event) => {
    event.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {!loading ? (
        <section id="signup-section" className="flex justify-center items-center h-screen bg-white">
          <div className="min-h-screen bg-white-50 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your email</h2>
                <p className="mt-6 block text-sm font-medium text-gray-700">
                  An email verification was sent to {email}.
                  <a onClick={changeAccount} className="mt-6 block text-sm font-medium text-blue-700 hover:underline">
                    Change account?
                  </a>
                </p>

                <div>
                  <p className="mt-6 block text-sm font-medium text-gray-700">Didn't recieve email?</p>
                </div>

                <div className="mt-3 py-2">
                  <button
                    onClick={submitVerification}
                    type="submit"
                    className="border-2 border-gray-500 bg-gray-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-500 font-semibold">
                    Resend Email Verification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
