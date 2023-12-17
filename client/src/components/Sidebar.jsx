import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/actions/userActionCreators";
import { Loader } from "../components/Loader";
import { UserProfileModal } from "./UserProfileModal";
import { submitLogout } from "../store/actions/userAuthCreator";
import { Link, useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(submitLogout()).then(() => {
          setLoading(true);
          navigate("/login");
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully logged out!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchUserProfile()).then(() => {
      setLoading(false);
    });
  }, []);
  
  return (
    // <!-- Sidebar -->
    <>
      {!loading ? (
        <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100 fixed left-0 top-0 bottom-0">
          <div className="flex items-center p-2 space-x-4">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fman-icon-black-icon-person-symbol-vector-id1332100919%3Fk%3D20%26m%3D1332100919%26s%3D612x612%26w%3D0%26h%3DzkXGeOtSyUajHAoWxlTPTC-qWjjnUkh6twiCK9b0JoI%3D&f=1&nofb=1&ipt=6dad630a3d1b3a22b844d7c50fc6cae0e6a637427569696a513ba9d9ac082b46&ipo=images"
              alt=""
              className="w-12 h-12 rounded-full dark:bg-gray-500"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <span className="flex items-center space-x-1">
                <a onClick={() => setShowModal(true)} rel="noopener noreferrer" className="text-xs hover:underline dark:text-gray-400">
                  View profile
                </a>
              </span>
            </div>
          </div>
          <div className="divide-y dark:divide-gray-700">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="dark:bg-gray-800 dark:text-gray-50">
                <a rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                    <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                  </svg>
                  <Link to={"/"} className="hover:underline">
                    Dashboard
                  </Link>
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                    <rect width="32" height="64" x="256" y="232"></rect>
                  </svg>
                  <a onClick={handleLogout} className="hover:underline">
                    Logout
                  </a>
                </a>
              </li>
            </ul>
          </div>
          <UserProfileModal isVisible={showModal} onClose={() => setShowModal(false)} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
