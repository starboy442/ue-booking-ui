import { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Counters from "../components/Layout/Counters/Counters";
import { AuthContext } from "../api/Auth";
import UserTable from "../components/Layout/Users/UserTable";
const Users = () => {
  const { getAllApplicationUsers, applicationUsers, alert } =
    useContext(AuthContext);
  useEffect(() => {
    const fetchAllApplicationUsers = async () => {
      await getAllApplicationUsers();
    };
    fetchAllApplicationUsers();
  }, []);
  return (
    <Layout>
      <Counters />
      <div className="directories-divider w-full flex gap-2 flex-wrap items-center my-2 realtive">
        <h1 className="text-slate-600 text-lg ">Application Users</h1>
        <div className="line grow border-y-2 border-violet-100 mt-1"></div>
        {/* <button
              className="bg-slate-600 text-white text-basic px-4 py-2 rounded-lg flex gap-2 items-center  hover:bg-violet-500 max-sm:w-full max-sm:justify-center"
              onClick={() => setModalVisible(true)}
            >
              <FontAwesomeIcon icon={faCloudArrowUp} /> Upload File
            </button> */}
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
        {applicationUsers.length > 0 ? (
          <UserTable />
        ) : (
          <div className="w-full rounded-md px-2 py-2 border-2">
            No User Exist
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;
