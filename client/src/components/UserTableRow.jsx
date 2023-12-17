import { useState } from "react";
import { LogoutTimestampModal } from "./LogoutTimeStampModal";

export const UserTableRow = ({ userData, idx }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {userData ? (
        <tr className="border-b">
          <td className="py-2 px-4">{idx}.</td>
          <td className="py-2 px-4 text-left">{userData.username}</td>
          <td className="py-2 px-4 border-r text-center">{userData.totalLogin}</td>
          <td className="py-2 px-4 border-r">{userData.createdAt}</td>
          <td className="py-2 px-4 text-center text-blue-400 hover:underline">
            <a onClick={() => setShowModal(true)}>Click here to see data!</a>
          </td>
        </tr>
      ) : (
        <tr className="border-b">
          <td colSpan="5" className="py-2 px-4 text-center">
            No result found.
          </td>
        </tr>
      )}
      <LogoutTimestampModal isVisible={showModal} onClose={() => setShowModal(false)} userData={userData} />
    </>
  );
};
