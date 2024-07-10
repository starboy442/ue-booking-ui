import { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Counters from "../components/Layout/Counters/Counters.jsx";
import Divider from "../components/Layout/Divider.jsx";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppointmentTable from "../components/Layout/Dashboard/AppointmentTable.jsx";
import { AuthContext } from "../api/Auth.jsx";
import { FileContext } from "../api/File.jsx";
import { title } from "../utils/Functions.jsx";
const Dashboard = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    alert,
    appointmentStatus,
    getRecentAppointments,
    recentAppointments,
  } = useContext(FileContext);

  useEffect(() => {
    const fetchAppointments = async () => await getRecentAppointments();
    fetchAppointments();
    const intervalId = setInterval(() => fetchAppointments(), 1000);
    return () => clearInterval(intervalId);
  }, [appointmentStatus]);

  return (
    <Layout>
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

      <span className="text-base text-black font-[400] block max-sm:flex max-lg:hidden lg:hidden">
        Welcome, {title(loggedInUser.username)}
      </span>
      <Counters />
      <Divider
        title={"Recent Appointment"}
        element={"link"}
        element_text={"Add Appointment"}
        element_link={"appointment/book"}
        icon={faPlus}
      />
      <div className="directories w-full flex  my-4">
        {recentAppointments.length > 0 ? (
          <AppointmentTable />
        ) : (
          <div className="w-full rounded-md px-2 py-2 border-2">
            No Recent Appointment Found
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
