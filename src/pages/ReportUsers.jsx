import { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Counters from "../components/Layout/Counters/Counters";
import { AuthContext } from "../api/Auth";
import { FileContext } from "../api/File";
import Loader from "../components/Layout/Loader";
import ReportedUserTable from "../components/Layout/Users/ReportedUserTable";
const ReportUsers = () => {
  const { loader } = useContext(AuthContext);
  const { getReportedUsers, reportedUsers, alert } = useContext(FileContext);

  useEffect(() => {
    const invokeReportedUsers = async () => {
      await getReportedUsers();
    };
    invokeReportedUsers();
  }, []);
  return (
    <Layout>
      <Counters />
      <div className="directories-divider w-full flex gap-2 flex-wrap items-center my-2 realtive">
        <h1 className="text-slate-600 text-lg ">Reported Users</h1>
        <div className="line grow border-y-2 border-violet-100 mt-1"></div>
      </div>
      {alert && (
        <div
          className={`alert w-full h-14 flex items-center px-4 ${
            alert.status === "success" ? "bg-green-100" : "bg-red-100"
          } rounded-xl ${
            alert.status === "success" ? "text-green-700" : "text-red-700"
          } font-[600]`}
        >
          {alert.message}
        </div>
      )}
      <div className="directories w-full flex  my-4">
        {reportedUsers.length > 0 ? (
          <ReportedUserTable />
        ) : loader ? (
          <Loader />
        ) : (
          <div className="w-full rounded-md px-2 py-2 border-2">
            No Reported User Exist
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportUsers;
