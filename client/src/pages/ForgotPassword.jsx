import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const { backendUrl, setUserToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/generate-otp", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setEmailSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/verify-otp", {
        email,
        otp,
      });
      if (data.success) {
        toast.success(data.message);
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        setEmailSubmitted(false);
        setEmail("");
        setOtp("");
        navigate("/setPassword");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full bg-[#692be0] min-h-screen flex items-center justify-center">
      <div className="w-90 bg-white border border-[#692be0] shadow-2xl border-3 rounded-3xl p-5">
        <h2 className="text-center text-[#692be0] text-3xl mt-4 font-bold">Forgot Password</h2>
        {!emailSubmitted ? (
          <form
            onSubmit={(e) => submitEmail(e)}
            className="flex flex-col gap-1 mt-5"
            action=""
          >
            <label htmlFor="">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
                type="email"
                required
                placeholder="Email"
              />
            </label>
            <input
              type="submit"
              value="Send OTP"
              className="bg-[#814de5] text-white text-lg h-14 rounded-lg mt-2 font-semibold cursor-pointer hover:bg-[#692be0]"
            />
          </form>
        ) : (
          <form
            onSubmit={(e) => onSubmitOtp(e)}
            className="flex flex-col gap-1 mt-8"
            action=""
          >
            <label className="justify-center flex gap-3 items-center" htmlFor="">
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="border rounded-xl focus:outline-[#692be0] focus:outline-3 w-full text-center h-14 mt-1 text-lg font-semibold"
                type="number"
                max="999999"
                min="00000012"
                placeholder="  *   *   *   *   *   *   "
                required
              />
            </label>
            <input
              type="submit"
              value="Verify OTP"
              className="bg-[#814de5] text-white text-lg h-14 rounded-lg mt-2 font-semibold cursor-pointer hover:bg-[#692be0]"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
