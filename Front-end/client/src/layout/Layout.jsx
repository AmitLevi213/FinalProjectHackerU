import Footer from "./footer/Footer";
import Main from "./main/Main";
import Header from "./header/Header";

import { Box } from "@mui/material";
import { node } from "prop-types";
import { useTheme } from "../providers/DarkThemeProvider";

const Layout = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#310047" : "#e3f2fd",
      }}
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  );
};
Layout.propTypes = {
  children: node.isRequired,
};
export default Layout;
