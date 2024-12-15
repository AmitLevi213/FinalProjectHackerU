import Cookies from "js-cookie";
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

export const setTokenInCookies = (encodedToken) => {
  Cookies.set(TOKEN, encodedToken, { expires: 7, sameSite: "Strict" });
  resetInactivityTimer();
};

export const getUser = () => {
  try {
    const token = Cookies.get(TOKEN);
    resetInactivityTimer();
    return token ? jwtDecode(token) : null;
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  Cookies.remove(TOKEN, { sameSite: "Strict" });
  clearTimeout(inactivityTimer);
};

export const getToken = () => {
  resetInactivityTimer();
  return Cookies.get(TOKEN);
};

// Reset inactivity timer on user activity
document.addEventListener("click", resetInactivityTimer);
