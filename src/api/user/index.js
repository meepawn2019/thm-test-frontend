import api from "../../axios";

export const getUser = async () => {
  const res = await api.get(`/users/me`);
  return res;
};

export const updateUser = async ({ id, data }) => {
  console.log(data);
  const res = await api.put(`/users/${id}`, data);
  return res;
};
