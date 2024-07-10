import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
const Divider = ({ title, element, element_text, element_link, icon }) => {
  return (
    <div className="directories-divider w-full flex gap-2 flex-wrap items-center my-2 realtive">
      <h1 className="text-slate-600 text-lg ">{title}</h1>
      <div className="line grow border-y-2 border-violet-100 mt-1"></div>
      {element === "button" ? (
        <button className="bg-slate-700 text-white text-basic px-4 py-2 rounded-lg flex gap-2 items-center  hover:bg-slate-600 max-sm:w-full max-sm:justify-center">
          <FontAwesomeIcon icon={icon} /> {element_text}
        </button>
      ) : element === "link" ? (
        <NavLink
          to={`/${element_link}`}
          className="bg-slate-700 text-white text-basic px-4 py-2 rounded-lg flex gap-2 items-center  hover:bg-slate-600 max-sm:w-full max-sm:justify-center"
        >
          <FontAwesomeIcon icon={icon} /> {element_text}
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
};

export default Divider;
