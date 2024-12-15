import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getToken, getUser } from "../services/StorageService";
import { node } from "prop-types";

const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const tokenFromCookies = getToken();
    if (tokenFromCookies) {
      const userFromCookies = getUser();
      setUser(userFromCookies);
    }
    return tokenFromCookies;
  });

  useEffect(() => {
    if (!user) {
      const userFromCookies = getUser();
      setUser(userFromCookies);
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
