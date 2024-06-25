import { arrayOf, func } from "prop-types";
import userType from "../types/userType";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import {
  useMediaQuery,
  Box,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useTheme } from "../../providers/DarkThemeProvider";

const Users = ({ users, onDelete, onChangeStatus }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { isDark } = useTheme();

  const getBackgroundColor = () => (isDark ? "#1a0033" : "#e3f2fd");
  const getTextColor = () => (isDark ? "#ffffff" : "#000000");
  const getBorderColor = () => (isDark ? "grey.800" : "grey.300");

  const columns = [
    { field: "idNumber", headerName: "Number", width: 90 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "isBusiness",
      headerName: "Business",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "Delete",
      headerName: "Delete",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => onDelete(params.row.id)}
          sx={{
            display: !params.row.isAdmin ? "block" : "none",
            color: getTextColor(),
          }}
        />,
      ],
    },
    {
      field: "change",
      headerName: "Change Business",
      type: "actions",
      width: 130,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<CachedIcon />}
          label="Change"
          onClick={() =>
            onChangeStatus(params.row.id, {
              isBusiness: !params.row.isBusiness,
            })
          }
          sx={{ color: getTextColor() }}
        />,
      ],
    },
  ];

  const rows = users.map((user, i) => ({
    id: user._id,
    idNumber: i + 1,
    lastName: user.name.last,
    firstName: user.name.first,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  }));

  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
      }}
    >
      {isMobile ? (
        <TransitionGroup>
          {rows.map((row) => (
            <Collapse key={row.id} timeout={500}>
              <Box
                border={1}
                borderColor={getBorderColor()}
                borderRadius={2}
                p={2}
                mb={2}
                width="100%"
                bgcolor={getBackgroundColor()}
              >
                <Typography
                  color="text.secondary"
                  variant="h6"
                  sx={{ color: getTextColor() }}
                >
                  {row.firstName} {row.lastName}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ color: getTextColor() }}
                >
                  Email: {row.email}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ color: getTextColor() }}
                >
                  Phone: {row.phone}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ color: getTextColor() }}
                >
                  Business: {row.isBusiness ? "Yes" : "No"}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ color: getTextColor() }}
                >
                  Admin: {row.isAdmin ? "Yes" : "No"}
                </Typography>
                {!row.isAdmin && (
                  <IconButton
                    onClick={() => onDelete(row.id)}
                    sx={{ color: getTextColor() }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <IconButton
                  onClick={() =>
                    onChangeStatus(row.id, { isBusiness: !row.isBusiness })
                  }
                  sx={{ color: getTextColor() }}
                >
                  <CachedIcon />
                </IconButton>
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5]}
          autoHeight
          sx={{
            "& .MuiDataGrid-root": {
              color: getTextColor(),
              borderColor: getBorderColor(),
              backgroundColor: getBackgroundColor(),
            },
            "& .MuiDataGrid-cell": {
              color: getTextColor(),
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: getBackgroundColor(),
              color: getTextColor(),
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: getBackgroundColor(),
              color: getTextColor(),
            },
          }}
        />
      )}
    </div>
  );
};

Users.propTypes = {
  users: arrayOf(userType),
  onDelete: func.isRequired,
  onChangeStatus: func.isRequired,
};

export default Users;
