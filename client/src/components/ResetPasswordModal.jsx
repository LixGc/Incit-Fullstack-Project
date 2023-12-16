import { useDispatch} from "react-redux";
import { useState } from "react";
import { resetPassword } from "../store/actions/userActionCreators";

export const ResetPasswordModal = ({ isVisible2, onClose2 }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(input))
      .then(() => {
        onClose2();
      })
  };
  if (!isVisible2) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative">
        <button onClick={() => onClose2()} className="text-black text-xl absolute top-2 right-2 z-10">
          X
        </button>
        <div className="w-[600px] h-[400px] overflow-y-auto flex flex-col bg-white p-4 rounded">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Reset Password
                </h3>
          <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input onChange={handleChange} value={input.oldPassword} type="password" name="oldPassword" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                        <input onChange={handleChange} value={input.newPassword} type="password" name="newPassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-enter new password</label>
                        <input onChange={handleChange} value={input.confirmPassword} type="password" name="confirmPassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};
