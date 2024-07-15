import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const AuthContext = createContext();

const Auth = ({ children }) => {
  const [loginToken, setLoginToken] = useState(Cookies.get("token"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ _id: "", username: "" });
  const [errorMessage, seterrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(null);
  const [applicationUsers, setApplicationUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);

  const hideAlerts = () => {
    setTimeout(() => setAlert(null), 1000);
  };

  const getUser = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/auth`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if (response.data.status === "success") {
          setLoggedInUser(response.data.user);
          setIsTokenExpired(false);
        } else if (
          response.data.status === "error" &&
          response.data.message === "Token has expired"
        ) {
          setIsTokenExpired(true);
          seterrorMessage("Your session has been expired.");
          setTimeout(() => seterrorMessage(null), 5000);
          Cookies.remove("token");
        }
      }
    } catch (error) {
      console.log("Get User", error);
    }
  };

  const getAllApplicationUsers = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`
      );
      if (
        response.data.status === "success" &&
        response.data.users.length > 0
      ) {
        setLoader(false);
        setApplicationUsers(response.data.users);
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

  const deleteApplicationUser = async (user_id) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/user/delete/${user_id}`
      );
      if (response.data.status === "success") {
        await getAllApplicationUsers();
        setLoader(false);
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
      } else {
        setLoader(false);
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
      }
      hideAlerts();
    } catch (error) {
      setLoader(false);
      setAlert({
        status: "error",
        message: error.message,
      });
      hideAlerts();
    }
  };

  const authenticate = async (data) => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/auth`,
        {
          ...data,
        }
      );
      if (response) {
        if (response.data.status === "error") {
          setLoader(false);
          seterrorMessage(response.data.message);
          setTimeout(() => seterrorMessage(null), 3000);
        } else {
          setLoader(false);
          Cookies.set("token", response.data.token);
          // localStorage.setItem("token", response.data.token);
          setLoginToken(response.data.token);
          await getUser();
          seterrorMessage(null);
        }
      }
    } catch (error) {
      setLoader(false);
      seterrorMessage(`Authentication Error : ${error.message}`);
      setTimeout(() => seterrorMessage(null), 3000);
    }
  };


  const register = async (data) => {
    try {
      setLoader(true);
      const response  = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/auth/register`,
        {
          ...data,
        }
      );
      if(response.data.status === "success"){
        setLoader(false);
        Cookies.set("token", response.data.token);
        setLoginToken(response.data.token);
        await getUser();
        seterrorMessage(null);
      } else {
        setLoader(false);
        seterrorMessage(response.data.message);
        setTimeout(() => seterrorMessage(null), 3000);
      }
    } catch (error) {
      setLoader(false);
      seterrorMessage(`Registration Error : ${error.message}`);
      setTimeout(() => seterrorMessage(null), 3000);
    }

  }

  const change_password = async (data) => {
    if (data.password === data.confirm_password) {
      try {
        setLoader(true);
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/admin/auth`,
          {
            ...data,
          },
          {
            headers: {
              Authorization: "Bearer " + loginToken,
            },
          }
        );
        if (response.data.status === "success") {
          setLoader(false);
          setAlert({
            status: "success",
            message: response.data.message,
          });
          setTimeout(() => setAlert(null), 3000);
          // await logout();
        } else {
          setLoader(false);
          setAlert({
            status: "danger",
            message: response.data.message,
          });
          setTimeout(() => setAlert(null), 3000);
        }
      } catch (error) {
        setLoader(false);
        setAlert({
          status: "danger",
          message: error.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } else {
      seterrorMessage("Passwords didn't match");
      setTimeout(() => seterrorMessage(null), 3000);
    }
  };

  const banned_user = async (banned_user_id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/user/banned`,
        {
          banned_user_id,
        }
      );
      if (response.data.status === "success") {
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
      } else {
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
    }
    hideAlerts();
  };


  const un_banned_user = async (banned_user_id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/user/unbanned`,
        {
          banned_user_id,
        }
      );
      if (response.data.status === "success") {
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
      } else {
        setAlert({
          status: response.data.status,
          message: response.data.message,
        });
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
    }
    hideAlerts();
  };

  const getBannedUsers = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/user/banned`
      );
      setLoader(false);
      if (response.data.status === "success") {
        setBannedUsers(response.data.banned_users);
        console.log(response.data.banned_users);
      } else {
        setBannedUsers([]);
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

  const logout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        Cookies.remove("token");
        setLoginToken(null);
      }
    } catch (error) {
      seterrorMessage(`logout Error : ${error}`);
    }
  };

  const value = {
    register,
    authenticate,
    logout,
    errorMessage,
    seterrorMessage,
    loginToken,
    loggedInUser,
    loader,
    getUser,
    setLoader,
    change_password,
    alert,
    setAlert,
    isTokenExpired,
    getAllApplicationUsers,
    applicationUsers,
    deleteApplicationUser,
    banned_user,
    un_banned_user,
    getBannedUsers,
    bannedUsers,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
