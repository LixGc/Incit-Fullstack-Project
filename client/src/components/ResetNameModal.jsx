import { useDispatch} from "react-redux";
import { useState } from "react";
import { resetName } from "../store/actions/userActionCreators";

export const ResetNameModal = ({ isVisible3, onClose3 }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetName(username))
      .then(() => {
        onClose3();
      })
  };
  if (!isVisible3) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative">
        <button onClick={() => onClose3()} className="text-black text-xl absolute top-2 right-2 z-10">
          X
        </button>
        <div className="w-[600px] h-[230px] overflow-y-auto flex flex-col bg-white p-4 rounded">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Reset Name
                </h3>
          <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New name</label>
                        <input   onChange={(el) => setUsername(el.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ex: John Doe" required/>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};
