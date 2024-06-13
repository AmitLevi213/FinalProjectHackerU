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
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";

const CrmPage = () => {
  const { user } = useUser();
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) return navigate(ROUTES.MUSIC);
    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  const onDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onChangeStatus = async (userId, updatedUser) => {
    console.log(updatedUser);
    try {
      await changeBusinessStatus(userId, updatedUser);
      await fetchUsers();
    } catch (error) {
      console.error("Error changing business status:", error);
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
        onChangeStatus={onChangeStatus}
      />
    </Container>
  );
};

export default CrmPage;
