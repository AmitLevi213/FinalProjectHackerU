import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:9191/users";

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${apiUrl}/login`, user);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const signup = async (user) => {
  try {
    const { data } = await axios.post(`${apiUrl}`, user);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editUser = async (user, id) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${id}`, { user });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
