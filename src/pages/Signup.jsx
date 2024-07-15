import { useState, useContext } from "react";
import { AuthContext } from "../api/Auth.jsx";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Layout/Loader.jsx";
import Cookies from "js-cookie";
const Initialize_Field = {
  username: "",
  email:"",
  role:"admin",
  password: "",

};
const Signup = () => {
  const { register, errorMessage, loader, alert } = useContext(AuthContext);
  const [formData, setFormData] = useState(Initialize_Field);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      await register(formData);
      const token = Cookies.get("token");
      if (token) {
        navigate("/dashboard", { replace: true });
        setFormData(Initialize_Field);
      }
    }
  };
  return (
    <div className="login-wrapper max-sm:px-6">
      <div className="login-header px-8 max-sm:px-4">
        <h1 className="font-bold text-slate-600 text-2xl">UE-BOOKING</h1>
      </div>

      <div className="login-box px-6 py-8">
        <h1 className="font-[600] text-slate-600 text-2xl w-full text-center">
          Create Account.
        </h1>
        {errorMessage && (
          <div className="bg-red-100 rounded-lg w-full px-3 py-3 mt-3">
            <p className="text-base text-red-500 font-[500]">{errorMessage}</p>
          </div>
        )}
        {alert && (
          <div
            className={`alert w-full h-14 flex items-center px-4 ${
              alert.status === "success" ? "bg-green-100" : "bg-red-100"
            } rounded-xl ${
              alert.status === "success" ? "text-green-700" : "text-red-700"
            } font-[600] mt-3`}
          >
            {alert.message}
          </div>
        )}

        <form
          method="post"
          className="w-full mt-4 text-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="input placeholder:text-sm focus:bg-white"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            className="input placeholder:text-sm focus:bg-white"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input placeholder:text-sm"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="inline-block px-12 py-2 mt-3 bg-slate-800 text-white text-lg rounded-lg hover:bg-slate-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-700  focus:bg-slate-700 "
            disabled={loader}
          >
            {!loader ? "Signup" : <Loader />}
          </button>
          <Link to="/" className="block mt-3 text-sm text-slate-600 hover:text-slate-700">Already a member</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
