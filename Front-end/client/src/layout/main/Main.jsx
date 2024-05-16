import { node } from "prop-types";
import { Box } from "@mui/material";
import { useTheme } from "../../providers/DarkThemeProvider";

const Main = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: isDark ? "#310047" : "#e3f2fd",
        }}
      >
        {children}
      </Box>
    </>
  );
};

Main.propTypes = {
  children: node.isRequired,
};
export default Main;
