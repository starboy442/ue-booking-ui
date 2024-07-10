// import Loader from "../Layout/Loader";
import { useContext } from "react";
import { FileContext } from "../../../api/File";
import { AuthContext } from "../../../api/Auth";
import { calculateHourDifference } from "../../../utils/Functions.jsx";
const AppointmentTable = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { recentAppointments, verify_appointment } = useContext(FileContext);
  const verifyClickHandler = async (appointment_id, verified) => {
    await verify_appointment(appointment_id, verified);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  border-slate-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr.
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Date
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Start Time
            </th>
            <th scope="col" className="px-6 py-3">
              Booking End Time
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Screen Spaces
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {recentAppointments.length > 0 &&
            recentAppointments.map((appointment, i) => (
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
                  {appointment.user_id === loggedInUser._id
                    ? loggedInUser.username
                    : appointment.username}
                </td>
                <td className="px-6 py-4">{appointment.booking_date}</td>
                <td className="px-6 py-4">{appointment.booking_start_time}</td>
                <td className="px-6 py-4">{appointment.booking_end_time}</td>
                <td className="px-6 py-4">
                  {calculateHourDifference(
                    appointment.booking_start_time,
                    appointment.booking_end_time
                  )}{" "}
                  Hour
                </td>
                <td className="px-6 py-4">{appointment.screen_space}</td>
                <td className="px-6 py-4">{appointment.content_description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      appointment.status === "Verified"
                        ? "bg-green-600"
                        : appointment.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-orange-600"
                    }
                     text-white px-2 py-1 rounded-md`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full flex justify-start gap-2">
                    <button
                      className={`bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500 ${
                        appointment.status === "Verified"
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } disabled:bg-green-400`}
                      onClick={() => {
                        verifyClickHandler(appointment._id, true);
                      }}
                      disabled={appointment.verified}
                    >
                      Verify
                    </button>
                    <button
                      className={`bg-rose-900 hover:bg-rose-800 text-white px-3 py-1 rounded-md ${
                        appointment.status === "Rejected"
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } disabled:bg-rose-400`}
                      onClick={() => {
                        verifyClickHandler(appointment._id, false);
                      }}
                      disabled={appointment.status === "Rejected" && true}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
