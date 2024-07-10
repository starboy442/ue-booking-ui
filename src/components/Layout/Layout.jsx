import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { ChangePasswordModal } from "./Modal/ChangePasswordModal.jsx";
import { AuthContext } from "../../api/Auth.jsx";
import { FileContext } from "../../api/File.jsx";
const Layout = ({ children }) => {
  const { getUser, loggedInUser } = useContext(AuthContext);
  const { getTotalAppointments, getTotalUsers, getTotalReportedUsers } =
    useContext(FileContext);
  useEffect(() => {
    const getLoggedInUser = async () => {
      await getUser();
    };
    getLoggedInUser();
  }, []);
  useEffect(() => {
    const invokeCounters = async () => {
      await getTotalAppointments();
      await getTotalUsers();
      await getTotalReportedUsers();
    };
    invokeCounters();
  }, []);
  return (
    loggedInUser.username && (
      <div className="layout-container w-full h-screen lg:min-h-screen">
        <Navbar nav_title={"UE-BOOKING"} />
        <Sidebar />
        <ChangePasswordModal />
        <div className="w-1/3 h-screen ml-[250px] pt-[40px] max-sm:w-full max-sm:ml-0">
          <div className="main-wrapper w-full h-full pt-10 px-8 max-sm:px-6">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
