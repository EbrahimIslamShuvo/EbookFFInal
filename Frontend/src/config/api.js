export const API_BASE_URL = "http://localhost:3000/api";

export const authHeader = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};
