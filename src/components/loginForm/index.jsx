import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { login } from "../../api/auth";
import { USER_ROUTE } from "../../constant/route";
import { setToken } from "../../handler/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate, data } = useMutation(login, {
    onSuccess: (data) => {
      setToken(data);
      navigate(USER_ROUTE);
    },
  });
  const handleLogin = (value, { setSubmitting }) => {
    mutate(value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen border border-gray-300 p-8 rounded-lg max-h-[400px] mx-auto">
      <h1 className="font-bold">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleLogin}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col min-h-[300px]"
            >
              {/* // make label text align to the left */}
              <label
                htmlFor="email"
                className="text-left font-bold text-black mt-4"
              >
                Email
              </label>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                className={`border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                  ${
                    errors.email && touched.email
                      ? "border-rose-700"
                      : "border-gray-300"
                  }
                `}
              />
              {errors.email && touched.email && (
                <div className="text-rose-700 text-left">{errors.email}</div>
              )}
              <label
                htmlFor="email"
                className="text-left font-bold text-black mt-4"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                className={`border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                ${
                  errors.password && touched.password
                    ? "border-rose-700"
                    : "border-gray-300"
                }
              `}
              />
              {errors.password && touched.password && (
                <div className="text-rose-700 text-left">{errors.password}</div>
              )}
              <button
                className="bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                Login
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
