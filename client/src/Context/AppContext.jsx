import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [view, setView] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/user", {
        headers: { token: userToken },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        // toast.error('Login');
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token) {
      setUserToken(Token);
    }
    else{
      navigate('/')
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  const value = {
    view,
    setView,
    backendUrl,
    userToken,
    setUserToken,
    userData,
    setUserData,
    fetchUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
