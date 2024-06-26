import Footer from "./footer/Footer";
import Main from "./main/Main";
import Header from "./header/Header";
import { Box } from "@mui/material";
import { node } from "prop-types";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
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
