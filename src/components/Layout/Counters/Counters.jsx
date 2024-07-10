import { useContext } from "react";
import { CounterItem } from "./CounterItem";
import { faUsers, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FileContext } from "../../../api/File";
const Counters = () => {
  const { totalAppointments, totalUsers, totalReportedUsers } =
    useContext(FileContext);
  return (
    <div className="counter w-full flex flex-wrap gap-4 mt-4">
      <CounterItem
        bgColor="bg-slate-100"
        textColor="text-slate-600"
        iconColor="text-slate-500"
        borderColor="border-slate-100"
        title="All Appointments"
        total={totalAppointments}
        icon={faCalendarDays}
      />
      <CounterItem
        bgColor="bg-slate-100"
        textColor="text-slate-600"
        iconColor="text-slate-500"
        borderColor="border-slate-100"
        title="Application Users"
        total={totalUsers}
        icon={faUsers}
      />
      <CounterItem
        bgColor="bg-slate-100"
        textColor="text-slate-600"
        iconColor="text-slate-500"
        borderColor="border-slate-100"
        title="Reported Users"
        total={totalReportedUsers}
        icon={faUsers}
      />
    </div>
  );
};

export default Counters;
