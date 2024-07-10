import { useContext } from "react";
import { AuthContext } from "../../../api/Auth";
const BannedUserTable = ({ users }) => {
  const { un_banned_user, getBannedUsers } = useContext(AuthContext);
  const onUnBanned = async (banned_user_id) => {
    await un_banned_user(banned_user_id);
    await getBannedUsers();
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  border-slate-700  border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr.
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={i + 1}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">
                  <span
                    className="bg-red-600
                     text-white px-2 py-1 rounded-md"
                  >
                    Banned
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full flex justify-start gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-md "
                      onClick={() => {
                        onUnBanned(user._id);
                      }}
                    >
                      UnBanned
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannedUserTable;
