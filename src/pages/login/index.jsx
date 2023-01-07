import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../components/loginForm";
import withAuth from "../../middleware/withAuth";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <Fragment>
      <LoginForm />
    </Fragment>
  );
};

export default withAuth(Login);
