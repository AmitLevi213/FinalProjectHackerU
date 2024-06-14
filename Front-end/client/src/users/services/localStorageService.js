import { jwtDecode } from "jwt-decode";

const TOKEN = "token";
const INACTIVITY_TIMEOUT = 14_000_000;

let inactivityTimer = null;

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    removeToken();
  }, INACTIVITY_TIMEOUT);
};

export const setTokenInLocalStorage = (encodedToken) => {
  localStorage.setItem(TOKEN, encodedToken);
  resetInactivityTimer();
};

export const getUser = () => {
  try {
    const user = localStorage.getItem(TOKEN);
    resetInactivityTimer();
    return jwtDecode(user);
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
  clearTimeout(inactivityTimer);
};

export const getToken = () => {
  resetInactivityTimer();
  return localStorage.getItem(TOKEN);
};

document.addEventListener("click", resetInactivityTimer);
