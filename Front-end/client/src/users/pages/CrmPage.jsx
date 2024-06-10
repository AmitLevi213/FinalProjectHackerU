import { useState, useEffect } from "react";
import { useUser } from "../providers/UserProvider";
import {
  getUsers,
  deleteUser,
  changeBusinessStatus,
} from "../services/usersApiService";
import Spinner from "../../components/Spinner";
import { Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Users from "../components/Users";

const CrmPage = () => {
  const { user } = useUser();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  const onDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onChangeBusinessType = async (userId, updatedUser) => {
    try {
      const updatedUserData = await changeBusinessStatus(userId, updatedUser);
      const updatedUsers = users.map((user) =>
        user._id === userId ? updatedUserData : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error changing business type:", error);
    }
  };

  if (!users) {
    return <Spinner justifyContent="center" alignItems="center" />;
  }

  return (
    <Container>
      <PageHeader
        title="CRM System"
        subtitle="Here you can find a CRM system of all the users"
      />
      <Users
        users={users}
        onDelete={onDeleteUser}
        onChangeBusinessType={onChangeBusinessType}
      />
    </Container>
  );
};

export default CrmPage;
