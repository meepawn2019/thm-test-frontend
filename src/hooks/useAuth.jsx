import React from "react";

const useAuth = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return true;
  }

  return false;
};

export default useAuth;
