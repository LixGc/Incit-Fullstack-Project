import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDashboard } from "../store/actions/userActionCreators";
import { Loader } from "../components/Loader";
import { UserTableRow } from "../components/UserTableRow";
import { SearchButton } from "../components/SearchButton";

export const Dashboard = () => {
  const { users } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchUserDashboard());
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="ml-60 p-2 mx-auto sm:p-4 dark:text-gray-100">
          <h2 className="mb-4 text-2xl font-semibold leading">User Statistics</h2>
          <div className="col-12 md:col-6 mb-3">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/5 px-4 mb-4">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4">
                  <h6 className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Total Users</h6>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200" id="total-product">
                    {users.totalUser}
                  </h6>
                </div>
              </div>
              <div className="w-full md:w-1/5 px-4 mb-4">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4">
                  <h6 className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Today Sessions</h6>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200" id="total-product">
                    {users.todayActiveSession}
                  </h6>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-4">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4">
                  <h6 className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Average Last 7 Days Sessions</h6>
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200" id="total-product">
                    {users.averageActiveSessionsLast7Days}
                  </h6>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <SearchButton />
              </div>
            </div>
            <div className="flex flex-col overflow-x-auto text-xs">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">No.</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 border-r">Total Login</th>
                    <th className="py-2 px-4 text-left">Signup Timestamp</th>
                    <th className="py-2 px-4">Logout Timestamp</th>
                  </tr>
                </thead>
                {users.user ? (
                  <tbody>
                    {users.user.length > 0 ? (
                      users.user.map((userData, idx) => (
                        <UserTableRow key={idx} userData={userData} idx={idx + 1} />
                      ))
                    ) : (
                      <tr>
                      <td colSpan="5" className="text-gray-500 text-xl">
                        No data found
                      </td>
                    </tr>
                    )}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="5">
                        <Loader />
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
