import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import MenuBar from "../right-area/MenuBar";
import { node } from "prop-types";

const MenuContext = createContext(null);

const MenuProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const anchorRef = useRef();

  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setAnchorEl(anchorRef.current);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [screenSize]);

  return (
    <>
      <MenuContext.Provider value={setOpen}>{children}</MenuContext.Provider>
      <Box
        ref={anchorRef}
        component="span"
        position="fixed"
        top="70px"
        right="20px"
      />
      {anchorEl && (
        <MenuBar
          isMenuOpen={isOpen}
          anchorEl={anchorEl}
          onCloseMenu={() => setOpen(false)}
        />
      )}
    </>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

MenuProvider.propTypes = {
  children: node.isRequired,
};

export default MenuProvider;
