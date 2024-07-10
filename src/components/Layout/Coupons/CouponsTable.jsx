// import Loader from "../Layout/Loader";
import { useContext } from "react";
import { FileContext } from "../../../api/File";
const CouponsTable = () => {
  const { coupons, deleteCoupons } = useContext(FileContext);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  border-slate-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sr.
            </th>
            <th scope="col" className="px-6 py-3">
              Coupon Code
            </th>
            <th scope="col" className="px-6 py-3">
              Coupon Expiry Time
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
          {coupons.length > 0 &&
            coupons.map((coupon, i) => (
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
                <td className="px-6 py-4">{coupon.coupon}</td>
                <td className="px-6 py-4">
                  {new Date(coupon.coupon_expiry_time).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span>
                    {new Date().toISOString() > coupon.coupon_expiry_time
                      ? "Expired"
                      : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`bg-rose-900 hover:bg-rose-800 text-white px-3 py-1 rounded-md cursor-pointer`}
                    onClick={async () => {
                      await deleteCoupons(coupon._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsTable;
