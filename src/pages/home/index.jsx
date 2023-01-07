import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { logout } from "../../api/auth";
import { LOGIN_ROUTE, USER_ROUTE } from "../../constant/route";
import withAuth from "../../middleware/withAuth";

const Home = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate(LOGIN_ROUTE);
    },
  });

  const handleEditUserClick = () => {
    navigate(USER_ROUTE);
  };

  const handleLogout = () => {
    mutate();
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white p-2 rounded-lg mt-4 mr-8 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleEditUserClick}
      >
        Edit User
      </button>
      <button
        className="bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default withAuth(Home);
