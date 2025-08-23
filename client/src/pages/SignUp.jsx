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
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { backendUrl, setUserToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    setLoading(true);
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
        setLoading(false);
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Account Created");
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
      <div className="w-100 bg-white border border-[#692be0] shadow-2xl border-3 rounded-3xl p-5">
        <h2 className="text-center text-[#692be0] text-3xl mt-4 font-bold">Welcome</h2>
        <p className="text-center text-gray-500">Register to our platform</p>
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-1 mt-8"
          action=""
        >
          <label htmlFor="">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 text-lg font-semibold w-full px-2 h-14 mt-1"
              required
              type="text"
              placeholder="Name"
            />
          </label>
          <label htmlFor="">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 text-lg font-semibold w-full px-2 h-14 mt-1"
              type="email"
              placeholder="Email"
              required
            />
          </label>
          <label htmlFor="">
            <input
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 text-lg font-semibold w-full px-2 h-14 mt-1"
              required
              type="number"
              maxLength='10'
              placeholder="Number"
            />
          </label>
          <label htmlFor="">
            <input
              onChange={(e) => setAge(e.target.value)}
              value={age}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 text-lg font-semibold w-full px-2 h-14 mt-1"
              required
              min="1"
              type="number"
              placeholder="Age"
            />
          </label>
          <label htmlFor="">
            <select
              onChange={(e) => setGender(e.target.value)}
              className="text-gray-600 border rounded-md focus:outline-[#692be0] focus:outline-3 text-lg font-semibold mt-1 h-14"
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
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border rounded-md focus:outline-[#692be0] focus:outline-3 text-lg font-semibold w-full px-2 h-14 mt-1"
              type="password"
              required
              placeholder="Password"
            />
          </label>
            <label htmlFor="img" className="flex cursor-pointer items-center gap-3 mt-2">
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
                 accept=".png, .jpeg, .jpg"
              />
            <p className="font-semibold">Upload image
              <br />
              <span className="font-normal text-sm">Accepted file types: png, jpeg</span>
            </p>
            </label>
          <input
            type="submit"
            value="Sign Up"
            className="bg-[#814de5] text-white text-lg h-14 rounded-lg mt-2 font-semibold cursor-pointer hover:bg-[#692be0]"
          />
        </form>
        <div className="text-center mt-10">
          <span className="text-gray-600">Already have an account?</span>
          <span
            onClick={() => navigate("/login")}
            className="text-[#692be0] font-semibold pl-1 cursor-pointer"
          >
            Login!
          </span>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SignUp;
