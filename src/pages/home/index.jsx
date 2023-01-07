import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { logout } from "../../api/auth";
import { getUsers } from "../../api/user";
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

  const { data, isLoading, isError } = useQuery("user", getUsers, {});

  const handleEditUserClick = (data) => {
    navigate(`/user/${data.id}`);
  };

  const handleLogout = () => {
    mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 className="font-bold">Home</h1>
      <div>
        <ul>
          <div className="flex flex-row gap-x-4">
            <p className="font-bold text-lg">First Name</p>
            <p className="font-bold text-lg">Email</p>
          </div>
          {data.map((user) => (
            <li key={user.id}>
              <div className="border border-gray-300 p-4 rounded-lg flex flex-row gap-x-4 items-center justify-between mb-4">
                <p className="mr-4">{user.first_name}</p>
                <p>{user.email}</p>
                <button
                  className="bg-blue-600 min-w-[90px] text-white p-2 rounded-lg mr-8 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleEditUserClick(user)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <button
        className="bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLogout}
      >
        Logout
      </button> */}
    </div>
  );
};

export default withAuth(Home);
