import { useContext } from "react";
import { AuthContext } from "../../../api/Auth";
import { FileContext } from "../../../api/File";
const ReportedUserTable = () => {
  const { banned_user } = useContext(AuthContext);
  const { reportedUsers, getReportedUsers } = useContext(FileContext);
  const onBanned = async (banned_user_id) => {
    await banned_user(banned_user_id);
    await getReportedUsers();
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
              Reported Username
            </th>
            <th scope="col" className="px-6 py-3">
              Reported By
            </th>
            <th scope="col" className="px-6 py-3">
              Report Reason
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reportedUsers.length > 0 &&
            reportedUsers.map((user, i) => {
              {
                return !user.reported_user_id.banned ? (
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
                    <td className="px-6 py-4">
                      {user.reported_user_id.username}
                    </td>
                    <td className="px-6 py-4">
                      {user.reported_by_user_id.username}
                    </td>
                    <td className="px-6 py-4">{user.report_reason}</td>
                    <td className="px-6 py-4">
                      <div className="w-full flex justify-start gap-2">
                        <button
                          className="bg-orange-500 hover:bg-orange-400 text-white px-3 py-1 rounded-md "
                          onClick={() => {
                            onBanned(user.reported_user_id._id);
                          }}
                        >
                          Banned
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : reportedUsers.length === 1 ? (
                  <tr className="bg-white" key={i + 1}>
                    <td className="px-6 py-4 border-0">
                      No Reported User Exist
                    </td>
                  </tr>
                ) : (
                  ""
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedUserTable;
