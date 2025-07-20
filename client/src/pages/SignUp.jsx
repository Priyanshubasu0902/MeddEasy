import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import uploadImage from "../assets/upload_area.svg";
import Loading from "../components/Loading";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false)

  const { backendUrl, setUserToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("image", image);
      formData.append("password", password);
      const { data } = await axios.post(
        backendUrl + "/api/users/signUp",
        formData
      );
      if (data.success) {
        setLoading(false)
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success('Account Created')
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return !loading? (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-90 border rounded-xl p-5">
        <h2 className="text-center text-xl font-semibold">Sign Up</h2>
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-3"
          action=""
        >
          <label htmlFor="">
            <span className="font-semibold">Name:</span>
            <br />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border rounded w-full px-2 h-8 mt-1"
              required
              type="text"
              placeholder="Enter full name"
            />
          </label>
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
            <span className="font-semibold">Age:</span>
            <br />
            <input
              onChange={(e) => setAge(e.target.value)}
              value={age}
              className="border rounded w-full px-2 h-8 mt-1"
              required
              min="1"
              type="number"
              placeholder="Enter age"
            />
          </label>
          <label htmlFor="">
            <span className="font-semibold">Gender:</span>
            <br />
            <select
              onChange={(e) => setGender(e.target.value)}
              className="border rounded mt-1"
              required
              name=""
              id=""
            >
              <option value="" hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
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
          <div className="flex items-center gap-3 mt-2">
            <label htmlFor="img">
              <img
                className="w-16 h-16 object-contain rounded-full cursor-pointer"
                src={image ? URL.createObjectURL(image) : uploadImage}
                alt=""
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                hidden
                id="img"
              />
            </label>
            <p>Upload image</p>
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="bg-gray-300 h-9 rounded-lg my-3 font-semibold cursor-pointer hover:bg-blue-500"
          />
        </form>
        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 pl-1 cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  ):<Loading/>;
};

export default SignUp;
