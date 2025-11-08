// web/src/utils/auth.js
export const login = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => !!localStorage.getItem("token");

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};
