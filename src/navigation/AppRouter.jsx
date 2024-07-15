import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Signup,
  Login,
  Dashboard,
  Users,
  AddAppointment,
  Coupons,
  AddCoupon,
  ReportUsers,
  BannedUsers,
} from "../pages/index.jsx";
import { AuthContext } from "../api/Auth.jsx";
const AppRouter = () => {
  const { loginToken, isTokenExpired } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/signup"
          element={
            loginToken && !isTokenExpired ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/"
          element={
            loginToken && !isTokenExpired ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            loginToken && !isTokenExpired ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/coupons"
          element={
            loginToken && !isTokenExpired ? (
              <Coupons />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/coupon/add"
          element={
            loginToken && !isTokenExpired ? (
              <AddCoupon />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/users"
          element={
            loginToken && !isTokenExpired ? (
              <Users />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/appointment/book"
          element={
            loginToken && !isTokenExpired ? (
              <AddAppointment />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/user/reports"
          element={
            loginToken && !isTokenExpired ? (
              <ReportUsers />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/user/banned"
          element={
            loginToken && !isTokenExpired ? (
              <BannedUsers />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
