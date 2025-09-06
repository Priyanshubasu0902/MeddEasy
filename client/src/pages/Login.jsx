import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState('');

  const [emailType, setEmailType] = useState(true);
  const [loading, setLoading] = useState(false);

  const { backendUrl, setUserToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/users/login", {
        email,
        number,
        password,
      });
      if (data.success) {
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        setLoading(false);
        toast.success("Logged In");
        navigate("/home");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return !loading ? (
    <div className="w-full bg-[#692be0] min-h-screen flex items-center justify-center">
      <div className="w-90 bg-white border border-[#692be0] shadow-2xl border-3 rounded-3xl p-5">
        <h2 className="text-center text-[#692be0] text-3xl mt-4 font-bold">
          Welcome
        </h2>
        <p className="text-center text-gray-500">Login to our platform</p>
        <div className="w-full bg-[#814de5] font-semibold text-white flex h-10 mb-3 mt-8 items-center ">
          <div
            onClick={() => {
              setEmailType(true);
              setNumber("");
              setPassword("");
            }}
            className={`w-1/2 h-full flex items-center justify-center cursor-pointer ${
              !emailType && "bg-white text-black"
            }`}
          >
            Using Email
          </div>
          <div
            onClick={() => {
              setEmailType(false);
              setEmail("");
              setPassword("");
            }}
            className={`w-1/2 h-full flex items-center justify-center cursor-pointer  ${
              emailType && "bg-white text-black"
            }`}
          >
            Using Number
          </div>
        </div>
        {emailType ? (
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex flex-col gap-1"
            action=""
          >
            <label htmlFor="">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
                type="email"
                placeholder="Email"
                required
              />
            </label>
            <label htmlFor="">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
                type="password"
                required
                placeholder="Password"
              />
            </label>
            <input
              type="submit"
              value="Login"
              className="bg-[#814de5] text-white text-lg h-14 rounded-lg mt-2 font-semibold cursor-pointer hover:bg-[#692be0]"
            />
            <p
              className="text-md text-[#692be0] mt-2 font-semibold text-center cursor-pointer"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </p>
          </form>
        ) : (
          <form
            onSubmit={(e) => onSubmitHandler(e)}
            className="flex flex-col gap-1"
            action=""
          >
            <label htmlFor="">
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
                required
                type="number"
                placeholder="Number"
              />
            </label>
            <label htmlFor="">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
                type="password"
                required
                placeholder="Password"
              />
            </label>
            <input
              type="submit"
              value="Login"
              className="bg-[#814de5] text-white text-lg h-14 rounded-lg mt-2 font-semibold cursor-pointer hover:bg-[#692be0]"
            />
            <p
              className="text-md text-[#692be0] mt-2 font-semibold text-center cursor-pointer"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </p>
          </form>
        )}
        <div className="text-center mt-15">
          <span className="text-gray-600">Do not have an account?</span>
          <span
            onClick={() => navigate("/signUp")}
            className="text-[#692be0] font-semibold pl-1 cursor-pointer"
          >
            Sign Up!
          </span>
        </div>
      </div>
    </div>
  ):(<Loading dashboard={false}/>);
};

export default Login;
