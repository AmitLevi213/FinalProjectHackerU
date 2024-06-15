import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useAxios from "../../hooks/useAxios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import {
  changeBusinessStatus,
  deleteUser,
  editUser,
  getUsers,
  login,
  signup,
} from "../services/usersApiService";
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
        const updatedUser = getUser(id);
        requestStatus(false, null, null, updatedUser);
        snackbar("success", "you have updated your account information");
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [requestStatus]
  );
  const handleGetUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const user = await getUser(userId);
        requestStatus(false, null, null, user);
        return user;
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [requestStatus]
  );

  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      requestStatus(false, null, users, user);
      return users;
    } catch (error) {
      requestStatus(false, error.message, null);
    }
  }, [requestStatus, user]);

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        await deleteUser(userId);
        snackbar("success", "The user has been successfully deleted");
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [snackbar, requestStatus]
  );

  const handleChangeBusinessStatus = useCallback(
    async (userId, userFromClient) => {
      try {
        setLoading(true);
        const user = await changeBusinessStatus(userId, userFromClient);
        requestStatus(false, null, users, user);
        snackbar("success", "The business user has been successfully updated");
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [requestStatus, snackbar, users]
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
    handleGetUser,
    handleDeleteUser,
    handleGetUsers,
    handleChangeBusinessStatus,
  };
};

export default useHandleUsersFunctions;
