import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useAxios from "../../hooks/useAxios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { editUser, login, signup } from "../services/usersApiService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnackbar } from "../../providers/SnackbarProvider";

const useHandleUsersFunctions = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  const snackbar = useSnackbar();

  useAxios();

  useEffect(() => {
    setQuery({
      q: searchParams.get("q") ?? "",
      isBusiness: searchParams.get("isBusiness"),
    });
  }, [searchParams]);

  useEffect(() => {
    if (users) {
      const filtered = users.filter((u) => {
        const matchesQuery =
          u.name.first.includes(query.q) ||
          u.name.last.includes(query.q) ||
          u.phone.includes(query.q) ||
          u.name.middle.includes(query.q);

        const matchesBusinessFilter =
          !query.isBusiness || u.isBusiness === String(u.isBusiness);

        return matchesQuery && matchesBusinessFilter;
      });
      setFilteredUsers(filtered);
    }
  }, [query, users]);
  const requestStatus = useCallback(
    (loading, errorMessage, users, user = null) => {
      setLoading(loading);
      setError(errorMessage);
      setUsers(users);
      setUser(user);
    },
    [setUser]
  );

  const userLoginFunction = useCallback(
    async (user) => {
      try {
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, null, userFromLocalStorage);
        snackbar(
          "success",
          "you have been successfully logged in to your user "
        );
        navigate(ROUTES.CARDS);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [navigate, requestStatus, setToken, snackbar]
  );
  const userLogoutFunction = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
    snackbar("warning", "you have been successfully logged out from your user");
  }, [setToken, setUser, snackbar]);

  const signupFunction = useCallback(
    async (user) => {
      try {
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await userLoginFunction({ email: user.email, password: user.password });
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [requestStatus, userLoginFunction]
  );

  const editUserFunction = useCallback(
    async (user, id) => {
      try {
        setLoading(true);
        const userUpdate = await editUser(user, id);
        requestStatus(false, null, null, userUpdate);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [requestStatus]
  );
  const value = useMemo(
    () => ({
      users,
      user,
      loading,
      error,
      filteredUsers,
    }),
    [users, user, loading, error, filteredUsers]
  );
  return {
    ...value,
    userLoginFunction,
    userLogoutFunction,
    signupFunction,
    editUserFunction,
  };
};

export default useHandleUsersFunctions;
