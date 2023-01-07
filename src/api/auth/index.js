// auth api call
import api from "../../axios";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res;
};
