import { useContext, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import Counters from "../components/Layout/Counters/Counters";
import Divider from "../components/Layout/Divider";
import Label from "../components/Layout/Form/Label";
import Input from "../components/Layout/Form/Input";
import Select from "react-select";
import { FileContext } from "../api/File";
const INITIAL_APPOINTMENT_DATA = {
  booking_name: "",
  booking_start_time: "",
  booking_end_time: "",
  booking_date: "",
  streaming_urls: "",
  coupon: "",
  content_description: "",
};
const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];
const customStyles = {
  container: (provided) => ({
    ...provided,
    height: "50px",
    borderRadius: "10px",
    padding: "1px",
  }),
  control: (provided, state) => ({
    ...provided,
    height: "100%",
    boxShadow: state.isFocused ? "rgba(0,0,0,0,0.5)" : 0,
    border: state.isFocused
      ? "2px solid #020617 !important"
      : "1px solid #cbd5e1",
    borderRadius: "8px",
  }),
};
const AddAppointment = () => {
  const { alert, makeAppointment, loader } = useContext(FileContext);
  const [appointmentData, setAppointmentData] = useState(
    INITIAL_APPOINTMENT_DATA
  );
  const [selectedScreen, setSelectedScreen] = useState([]);
  const selectRef = useRef(null);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleMultipleSelect = (selectedOptions) => {
    setSelectedScreen(selectedOptions.map((option) => option.value));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await makeAppointment(selectedScreen, appointmentData);
    setAppointmentData(INITIAL_APPOINTMENT_DATA);
    selectRef.current.clearValue();
    setSelectedScreen([]);
  };

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
      <Counters />
      <Divider title={"Add Appointment"} />
      <form
        className="w-full border-2 border-slate-100 rounded-md px-4 py-4 my-4"
        onSubmit={handleOnSubmit}
      >
        <div className="w-full flex gap-6 flex-col lg:flex-row  justify-between items-center">
          <div className="w-full lg:flex-1">
            <Label title={"Booking Name*"} />
            <Input
              type="text"
              name={"booking_name"}
              id={"booking_name"}
              placeholder="Booking Name"
              required={true}
              handleChange={handleOnChange}
              value={appointmentData.booking_name}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label title={"Select Screen Space*"} />
            <Select
              name="screen_space"
              options={options}
              isMulti={true}
              styles={customStyles}
              ref={selectRef}
              onChange={handleMultipleSelect}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label title={"Select Booking Date*"} />
            <Input
              type="date"
              name="booking_date"
              id="booking_date"
              placeholder="Select Booking Date"
              required={true}
              handleChange={handleOnChange}
              value={appointmentData.booking_date}
            />
          </div>
        </div>
        <div className="w-full flex gap-6  flex-col lg:flex-row items-center mt-6">
          <div className="w-full lg:flex-1">
            <Label title={"Booking Start Time*"} />
            <Input
              type="time"
              name="booking_start_time"
              id="booking_start_time"
              placeholder="Booking Start Time"
              required={true}
              value={appointmentData.booking_start_time}
              handleChange={handleOnChange}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label title={"Booking End Time*"} />
            <Input
              type="time"
              name="booking_end_time"
              id="booking_end_time"
              placeholder="Booking End Time"
              required={true}
              value={appointmentData.booking_end_time}
              handleChange={handleOnChange}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label title={"Coupon Code"} />
            <Input
              type="text"
              name={"coupon"}
              id={"coupon"}
              placeholder="Coupon Code"
              required={false}
              handleChange={handleOnChange}
              value={appointmentData.coupon}
            />
          </div>
        </div>
        <div className="w-full flex-1 mt-6">
          <Label title={"Video URL"} />
          <textarea
            name={"streaming_urls"}
            id={"streaming_urls"}
            placeholder={`http://www.example.com\nhttp://www.example2.com\nhttp://www.example3.com`}
            required={false}
            onChange={handleOnChange}
            value={appointmentData.streaming_urls}
            style={{
              width: "100%",
              height: "200px",
              resize: "none",
              border: "1px solid rgba(0,0,0,0.2)",
              paddingInline: "15px",
              paddingTop: "20px",
              borderRadius: "10px",
            }}
          ></textarea>
        </div>
        <div className="w-full flex-1 mt-6">
          <Label title={"Content Description"} />
          <textarea
            name={"content_description"}
            id={"content_description"}
            placeholder={`Write your content description here....`}
            required={true}
            onChange={handleOnChange}
            value={appointmentData.content_description}
            style={{
              width: "100%",
              height: "200px",
              resize: "none",
              border: "1px solid rgba(0,0,0,0.2)",
              paddingInline: "15px",
              paddingTop: "20px",
              borderRadius: "10px",
            }}
          ></textarea>
        </div>
        <button
          className={`bg-slate-700 text-white text-center px-4 py-2.5 rounded-lg hover:bg-slate-600 focus:bg-slate-600 mt-6 ${
            loader && "cursor-not-allowed"
          }`}
          disabled={loader}
        >
          Add Appointment
        </button>
      </form>
    </Layout>
  );
};

export default AddAppointment;
