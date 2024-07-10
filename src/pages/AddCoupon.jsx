import { useContext, useState } from "react";
import Layout from "../components/Layout/Layout";
import Counters from "../components/Layout/Counters/Counters";
import Divider from "../components/Layout/Divider";
import Label from "../components/Layout/Form/Label";
import Input from "../components/Layout/Form/Input";
import { FileContext } from "../api/File";
import { randomCoupon } from "../utils/Functions.jsx";
const INITIAL_COUPON_DATA = {
  coupon: randomCoupon(6),
  coupon_expiry_date: "",
  coupon_expiry_time: "",
};

const AddCoupon = () => {
  const { alert, loader, addCoupon } = useContext(FileContext);
  const [couponData, setCouponData] = useState(INITIAL_COUPON_DATA);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await addCoupon(couponData);
    setCouponData(INITIAL_COUPON_DATA);
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
      <Divider title={"Add Coupon"} />
      <form
        className="w-full border-2 border-slate-100 rounded-md px-4 py-4 my-4"
        onSubmit={handleOnSubmit}
      >
        <div className="w-full flex gap-6 flex-col lg:flex-row  items-center">
          <div className="w-full lg:flex-1">
            <Label title={"Coupon Code"} />
            <Input
              type="text"
              name={"coupon"}
              id={"coupon"}
              placeholder="Coupon Code"
              required={true}
              handleChange={handleOnChange}
              value={couponData.coupon}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label title={"Coupon Expiry Date"} />
            <Input
              type="date"
              name="coupon_expiry_date"
              id="coupon_expiry_date"
              required={true}
              handleChange={handleOnChange}
              value={couponData.coupon_expiry_date}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label title={"Coupon Expiry Time"} />
            <Input
              type="time"
              name="coupon_expiry_time"
              id="coupon_expiry_time"
              required={true}
              handleChange={handleOnChange}
              value={couponData.coupon_expiry_time}
            />
          </div>
        </div>
        <button
          className={`bg-slate-700 text-white text-center px-4 py-2.5 rounded-lg hover:bg-slate-600 focus:bg-slate-600 mt-6 ${
            loader && "cursor-not-allowed"
          }`}
          disabled={loader}
        >
          Add Coupon
        </button>
      </form>
    </Layout>
  );
};

export default AddCoupon;
