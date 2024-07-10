import { useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Counters from "../components/Layout/Counters/Counters.jsx";
import Divider from "../components/Layout/Divider.jsx";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CouponsTable from "../components/Layout/Coupons/CouponsTable.jsx";
import { AuthContext } from "../api/Auth.jsx";
import { FileContext } from "../api/File.jsx";
import { title } from "../utils/Functions.jsx";
const Coupons = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { alert, getCoupons, coupons } = useContext(FileContext);

  useEffect(() => {
    const fetchCoupons = async () => await getCoupons();
    fetchCoupons();
    const intervalId = setInterval(() => fetchCoupons(), 1000);
    return () => clearInterval(intervalId);
  }, []);

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
        title={"Coupon Codes"}
        element={"link"}
        element_text={"Add Coupon"}
        element_link={"coupon/add"}
        icon={faPlus}
      />
      <div className="directories w-full flex  my-4">
        {coupons.length > 0 ? (
          <CouponsTable />
        ) : (
          <div className="w-full rounded-md px-2 py-2 border-2">
            Coupons Not Found!
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Coupons;
