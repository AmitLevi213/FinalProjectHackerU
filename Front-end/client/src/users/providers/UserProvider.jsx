import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getToken, getUser } from "../services/localStorageService";
import { node } from "prop-types";
const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const tokenFromLocalStorage = getToken();
    if (tokenFromLocalStorage) {
      const userFromLocalStorage = getUser();
      setUser(userFromLocalStorage);
    }
    return tokenFromLocalStorage;
  });

  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      setUser(userFromLocalStorage);
    }
  }, [user]);

  const value = useMemo(
    () => ({ user, setUser, token, setToken }),
    [user, token]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
UserContext.propTypes = {
  children: node.isRequired,
};
export default UserProvider;
