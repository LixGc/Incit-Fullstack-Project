import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { fetchUserProfile } from "../store/actions/userActionCreators";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { ResetNameModal } from "./ResetNameModal";

export const UserProfileModal = ({ isVisible, onClose }) => {
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchUserProfile());
            setLoading(false);
        }, 1500);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {!loading ? (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="relative">
                        <button onClick={() => onClose()} className="text-black text-xl absolute top-2 right-2 z-10">
                            X
                        </button>
                        <div className="w-[600px] h-[400px] overflow-y-auto flex flex-col bg-white p-4 rounded">
                            <h3 className="w-full py-2 mb-5 text-xl font-semibold text-gray-900 dark:text-white">
                                My Profile
                            </h3>
                            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0 mx-auto">
                                <img
                                    src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG-Image.png&f=1&nofb=1&ipt=1e67b517fa4539e8ddb92899f4cf62d7eba024c3f3d9f93b15ffa5caba842bdd&ipo=images"
                                    alt="User Avatar"
                                    className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
                                />
                            </div>
                            <div className="text-gray-900 dark:text-white">
                                <p className="mb-2 text-center">
                                    <span className="font-semibold">Name: </span>{user.username} <a onClick={() => setShowModal2(true)} className="font-semibold hover:underline text-blue-400" >&#9998;Edit</a> 
                                </p>
                                <p className="mb-20 text-center">
                                    <span className="font-semibold">Email: </span> {user.email}
                                </p>
                                <p className="mb-2 text-center">
                                    <a onClick={() => setShowModal(true)} className="font-semibold hover:underline text-blue-400">Reset Password?</a>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                    <ResetNameModal isVisible3={showModal2} onClose3={() => setShowModal2(false)}/>
                    <ResetPasswordModal isVisible2={showModal} onClose2={() => setShowModal(false)}/>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};