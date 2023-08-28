"use client";

import IUserContext from "@/interfaces/IUserContext";
import { getUserDataFromCookie } from "@/libs/functions";
import { createContext, useContext, useEffect, useState } from "react";
const intialData: IUserContext = {
  username: "",
  setUsername: () => {},
};

const UserContext = createContext<IUserContext>(intialData);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
}) {
  const [userData, setUserData] = useState({})

  useEffect(() => {

    const data = getUserDataFromCookie()
    if (data) {
      setUserData(data);
    } else {
      setUserData({})
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
