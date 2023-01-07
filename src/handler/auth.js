const getToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const setToken = (token) => {
  localStorage.setItem("accessToken", token.accessToken);
  localStorage.setItem("refreshToken", token.refreshToken);
};

export { getToken, setToken, getRefreshToken };
