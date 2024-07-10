import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowRightFromBracket,
  faGauge,
  faUser,
  faGift,
  faFlag,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/Auth";
import { FileContext } from "../../api/File";
import { useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const { setPasswordModalVisible, toggleSidebar } = useContext(FileContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      className={`sidebar w-[250px] h-screen fixed top-0 left-0  border border-slate-100  bg-white   ${
        toggleSidebar ? "max-sm:left-0 z-10" : "max-sm:left-[-100%]"
      }`}
    >
      <div
        className={`flex flex-col justify-between w-full h-full ${
          toggleSidebar ? "pt-6" : "pt-24"
        }`}
      >
        <div className="w-full flex flex-col">
          <h4 className=" text-slate-400 text-[14px] font-light ml-4 mb-4">
            Manage Dashboard
          </h4>
          <NavLink to="/dashboard" className="links">
            <FontAwesomeIcon icon={faGauge} className="icon" /> Dashboard
          </NavLink>
          <NavLink to="/coupons" className="links">
            <FontAwesomeIcon icon={faGift} className="icon" /> Coupon Codes
          </NavLink>
          <NavLink to="/user/reports" className="links">
            <FontAwesomeIcon icon={faFlag} className="icon" />
            Reported Users
          </NavLink>
          <NavLink to="/user/banned" className="links">
            <FontAwesomeIcon icon={faBan} className="icon" />
            Banned Users
          </NavLink>
          <NavLink to="/users" className="links">
            <FontAwesomeIcon icon={faUser} className="icon" />
            Application Users
          </NavLink>
          <button
            className="links"
            onClick={() => setPasswordModalVisible(true)}
          >
            <FontAwesomeIcon icon={faLock} className="icon" /> Change Password
          </button>
        </div>
        <button type="button" className="links mb-0.5" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
};
