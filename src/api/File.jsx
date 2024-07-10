import { createContext, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
import { convertTimeString } from "../utils/Functions.jsx";
export const FileContext = createContext();
const File = ({ children }) => {
  const { loader, setLoader, alert, setAlert, errorMessage, loggedInUser } =
    useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [paswordModalVisible, setPasswordModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReportedUsers, setTotalReportedUsers] = useState(0);

  const hideAlerts = () => {
    setTimeout(() => setAlert(null), 1000);
  };

  const makeAppointment = async (selectedScreen, data) => {
    const appointment_data = {
      user_id: loggedInUser._id,
      booking_name: data.booking_name,
      booking_start_time: convertTimeString(
        data.booking_date,
        data.booking_start_time
      ),
      booking_end_time: convertTimeString(
        data.booking_date,
        data.booking_end_time
      ),
      booking_date: data.booking_date,
      screen_space: selectedScreen.join(" "),
      streaming_urls:
        data.streaming_urls.length > 0 ? data.streaming_urls.split("\n") : [],
      coupon: data.coupon,
      content_description: data.content_description,
    };
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/appointment/book`,
        appointment_data
      );
      if (response.data.status === "success") {
        setLoader(false);
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
        hideAlerts();
      } else {
        setLoader(false);
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
        hideAlerts();
      }
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "error",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const getAllAppointments = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/appointments`
      );
      if (response && response.data.status === "success") {
        setLoader(false);
        setAppointments(response.data.appointments);
      } else {
        setLoader(false);
        setAppointments([]);
      }
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const getRecentAppointments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/appointments/recent`
      );
      if (response && response.data.status === "success") {
        setRecentAppointments(response.data.appointments);
      } else {
        setRecentAppointments([]);
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const verify_appointment = async (appointment_id, verified) => {
    try {
      setLoader(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/appointment/verify`,
        {
          appointment_id: appointment_id,
          verified: verified,
        }
      );
      if (response && response.data.status === "success") {
        setLoader(false);
        setAppointmentStatus(verified);
        setAlert({
          status: "success",
          message: response.data.message,
        });
        hideAlerts();
      } else {
        setLoader(false);
        setAlert({
          status: "danger",
          message: response.data.message,
        });
        hideAlerts();
      }
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const addCoupon = async (data) => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/coupon/add`,
        {
          coupon: data.coupon,
          coupon_expiry_time: convertTimeString(
            data.coupon_expiry_date,
            data.coupon_expiry_time
          ),
        }
      );
      setLoader(false);
      setAlert({
        status: response.data.status,
        message: response.data.message,
      });
      hideAlerts();
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const getCoupons = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/coupons`
      );
      if (response && response.data.status === "success") {
        setLoader(false);
        setCoupons(response.data.coupons);
      } else {
        setLoader(false);
        setCoupons([]);
      }
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const deleteCoupons = async (coupon_id) => {
    try {
      setLoader(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/coupon/${coupon_id}`
      );
      setLoader(false);
      setAlert({
        status: response.data.status,
        message: response.data.message,
      });
      hideAlerts();
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const getReportedUsers = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/reports`
      );
      if (response.data.status === "success") {
        setLoader(false);
        setReportedUsers(response.data.reported_users);
      } else {
        setLoader(false);
        setAlert({
          status: "danger",
          message: response.data.message,
        });
      }
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "danger",
        message: error.message,
      });
    }
    hideAlerts();
  };

  const getTotalAppointments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/counter/appointments`
      );
      if (response.data.status === "success") {
        setTotalAppointments(response.data.total_appointments);
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const getTotalUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/counter/users`
      );
      if (response.data.status === "success") {
        setTotalUsers(response.data.total_users);
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const getTotalReportedUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/counter/reported_users`
      );
      if (response.data.status === "success") {
        setTotalReportedUsers(response.data.total_reported_users);
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const value = {
    alert,
    loader,
    getAllAppointments,
    modalVisible,
    setModalVisible,
    paswordModalVisible,
    setPasswordModalVisible,
    appointments,
    alertModalVisible,
    setAlertModalVisible,
    errorMessage,
    toggleSidebar,
    setToggleSidebar,
    verify_appointment,
    appointmentStatus,
    makeAppointment,
    getRecentAppointments,
    recentAppointments,
    addCoupon,
    getCoupons,
    coupons,
    deleteCoupons,
    getReportedUsers,
    reportedUsers,
    getTotalAppointments,
    getTotalUsers,
    getTotalReportedUsers,
    totalAppointments,
    totalUsers,
    totalReportedUsers,
  };
  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
export default File;
