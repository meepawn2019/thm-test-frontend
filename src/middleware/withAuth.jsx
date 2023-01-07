import { useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const withAuth = (Component) => {
  return (props) => {
    const isAuth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, []);
    return <Component {...props} />;
  };
};

export default withAuth;
