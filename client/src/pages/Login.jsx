import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import {toast} from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const [emailType, setEmailType] = useState(true)

  const {backendUrl, setUserToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
          const { data } = await axios.post(backendUrl + "/api/users/login", {
            email,
            number,
            password,
          });
          if (data.success) {
            setUserToken(data.token);
            localStorage.setItem('token', data.token);
            toast.success('Logged In')
            navigate('/home');
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-90 border rounded-xl p-5">
        <h2 className="text-center text-xl font-semibold">Log In</h2>
        <div className="w-full bg-blue-100 flex h-10 my-5 items-center ">
         <div onClick={()=>setEmailType(true)} className={`w-1/2 h-full flex items-center justify-center cursor-pointer ${emailType&&'bg-white'}`}>Using Email</div>
         <div onClick={()=>setEmailType(false)} className={`w-1/2 h-full flex items-center justify-center cursor-pointer  ${!emailType&&'bg-white'}`}>Using Number</div>
        </div>
        {emailType?(
         <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-3"
          action=""
        >
          <label htmlFor="">
            <span className="font-semibold">Email:</span>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border rounded w-full px-2 h-8 mt-1"
              type="email"
              placeholder="Enter email address"
            />
          </label>
          <label htmlFor="">
            <span className="font-semibold">Password:</span>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border rounded w-full px-2 h-8 mt-1"
              type="password"
              required
              placeholder="Enter password"
            />
          </label>
          <input
            type="submit"
            value="Login"
            className="bg-gray-300 h-9 rounded-lg my-3 font-semibold cursor-pointer hover:bg-blue-500"
          />
        </form>
        ):(
         <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-3"
          action=""
        >
          <label htmlFor="">
            <span className="font-semibold">Number:</span>
            <br />
            <input
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              className="border rounded w-full px-2 h-8 mt-1"
              required
              type="number"
              placeholder="Enter mobile number"
            />
          </label>
          <label htmlFor="">
            <span className="font-semibold">Password:</span>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border rounded w-full px-2 h-8 mt-1"
              type="password"
              required
              placeholder="Enter password"
            />
          </label>
          <input
            type="submit"
            value="Login"
            className="bg-gray-300 h-9 rounded-lg my-3 font-semibold cursor-pointer hover:bg-blue-500"
          />
        </form>
        )}
        <div className="text-center">
          <span className="text-gray-600">Do not have an account?</span>
          <span
            onClick={() => navigate("/signUp")}
            className="text-blue-600 pl-1 cursor-pointer"
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
