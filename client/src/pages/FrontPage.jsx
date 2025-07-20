import React from 'react'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
   const navigate = useNavigate();

  return (
    <>
      <div className="w-full bg-green-100 h-20 flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold m-auto">MedEasy</h1>
        <div className="flex gap-2">
          <span onClick={()=>navigate("/login")} className="cursor-pointer">Login</span>|
          <span onClick={()=>navigate("/signUp")} className="cursor-pointer">SignUp</span>
        </div>
      </div>
      <div>
      </div>
    </>
  );
}

export default FrontPage