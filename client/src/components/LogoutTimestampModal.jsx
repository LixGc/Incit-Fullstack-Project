export const LogoutTimestampModal = ({ isVisible, onClose, userData}) => {
    if (!isVisible) return null;
  
    const logoutHistories = userData?.UserHistories.filter(data => data.name === "logout");
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="relative">
            <button onClick={() => onClose()} className="text-black text-xl absolute top-2 right-2 z-10">
              X
            </button>
            <div className="w-[600px] h-[400px] overflow-y-auto flex flex-col bg-white p-4 rounded">
              <h3 className="py-3 text-xl font-semibold text-gray-900 dark:text-white">
                User Logout Timestamp
              </h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border p-2">No.</th>
                    <th className="border p-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logoutHistories.map((data, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-center">{index + 1}.</td>
                      <td className="border p-2 text-center">{data.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {logoutHistories.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No Logout Data available</p>
              )}
            </div>
          </div>
        </div>
      );
    };