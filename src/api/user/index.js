import api from "../../axios";

export const getProfile = async () => {
  const res = await api.get(`/users/me`);
  return res;
};

export const getUser = async (id) => {
  console.log(id);
  const res = await api.get(`/users/${id}`);
  return res;
};

export const getUsers = async () => {
  const res = await api.get(`/users`);
  return res;
};

export const updateUser = async ({ id, data }) => {
  console.log(data);
  const res = await api.put(`/users/${id}`, data);
  return res;
};
