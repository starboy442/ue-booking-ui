import { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Counters from "../components/Layout/Counters/Counters";
import { AuthContext } from "../api/Auth";
import Loader from "../components/Layout/Loader";
import BannedUserTable from "../components/Layout/Users/BannedUserTable";
const BannedUsers = () => {
  const { loader, getBannedUsers, bannedUsers, alert } =
    useContext(AuthContext);

  useEffect(() => {
    const invokeBannedUsers = async () => {
      await getBannedUsers();
    };
    invokeBannedUsers();
  }, []);
  return (
    <Layout>
      <Counters />
      <div className="directories-divider w-full flex gap-2 flex-wrap items-center my-2 realtive">
        <h1 className="text-slate-600 text-lg ">Banned Users</h1>
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
        {bannedUsers.length > 0 ? (
          <BannedUserTable users={bannedUsers} />
        ) : loader ? (
          <Loader />
        ) : (
          <div className="w-full rounded-md px-2 py-2 border-2">
            No Banned User Exist
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BannedUsers;
