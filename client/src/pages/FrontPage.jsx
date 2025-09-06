import { useNavigate } from "react-router-dom";
import HeartBeat from "../components/HeartBeat";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <div className="w-full bg-[#692be0] h-1/11 flex items-center justify-between p-5 sm:px-8">
        <h1 className="text-2xl text-white font-semibold">MeddEasy</h1>
        <div className="flex gap-3 items-center text-white text-lg font-semibold">
          {/* <span onClick={()=>navigate("/home")} className="cursor-pointer ">Home</span>| */}
          <span onClick={() => navigate("/login")} className="cursor-pointer ">
            Login
          </span>
          <button
            onClick={() => navigate("/signUp")}
            className="cursor-pointer bg-white rounded-4xl text-[#814de5] px-4 py-1"
          >
            SignUp
          </button>
        </div>
      </div>
      <div className="bg-[#814de5] h-10/11 w-full flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-3 justify-center items-center text-center px-20 max-sm:px-8">
          <h2 className="text-white font-bold text-4xl">
            Your Health, Simplified.
          </h2>
          <p className="text-white font-semibold text-lg">
            Manage records, track vitals, and never miss an appointment again.
          </p>
          <button
            onClick={() => navigate("/signUp")}
            className="bg-white mt-3 rounded-xl px-3 py-2 text-[#814de5] font-semibold text-md cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
