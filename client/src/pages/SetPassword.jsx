import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const SetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState("");
  const [match, setMatch] = useState("");

  const { backendUrl, userToken } = useContext(AppContext);

  const passwordStrength = (password) => {
    let str = 0;

    if (password.length >= 8) str++;
    if (/[a-z]/.test(password)) str++;
    if (/[A-Z]/.test(password)) str++;
    if (/[0-9]/.test(password)) str++;
    if (/[!@#$%^&*()]/.test(password)) str++;

    if (str === 0) return "";
    if (str <= 2) return "weak";
    if (str <= 4) return "medium";
    return "strong";
  };

  const checkMatch = (confirmPassword) => {
    if(confirmPassword===password) {
      setMatch(true);
    }
    else{
      setMatch(false);
    }
    if(confirmPassword.length===0){
      setMatch("");
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if ((strength === "strong" || strength === "medium")&&match===true) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          backendUrl + "/api/users/setPassword",
          {
            password,
            confirmPassword,
          },
          { headers: { token: userToken } }
        );
        if (data.success) {
          setLoading(false);
          setStrength("");
          setMatch("");
          toast.success(data.message);
          navigate("/login");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
  };

  return !loading ? (
    <div className="w-full bg-[#692be0] min-h-screen flex items-center justify-center">
      <div className="w-90 bg-white border border-[#692be0] shadow-2xl border-3 rounded-3xl p-5">
        <h2 className="text-center text-[#692be0] text-3xl mt-4 font-bold">
          Set Password
        </h2>

        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-1 mt-8"
          action=""
        >
          <label htmlFor="">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setStrength(passwordStrength(e.target.value));
              }}
              value={password}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
              type="password"
              required
              placeholder="New Password"
            />
          </label>
          {strength !== "" ? (
            <p
              className={`${
                strength === "weak"
                  ? "text-red-600"
                  : strength === "medium"
                  ? "text-yellow-400"
                  : strength === "strong"
                  ? "text-green-500"
                  : ""
              }`}
            >
              Your password is {strength}
            </p>
          ) : null}
          <label htmlFor="">
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                checkMatch(e.target.value);
              }}
              value={confirmPassword}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 w-full px-2 h-14 mt-1 text-lg font-semibold"
              type="password"
              required
              placeholder="Confirm new password"
            />
          </label>
          { match===false? 
            <p
              className="text-red-600"
            >
              Your passwords do not match
            </p>:null
            }
          <input
            type="submit"
            value="Set New Password"
            className="bg-[#814de5] text-white text-lg h-14 rounded-lg mt-2 font-semibold cursor-pointer hover:bg-[#692be0]"
          />
        </form>
      </div>
    </div>
  ) : (
    <Loading dashboard={false} />
  );
};

export default SetPassword;
