import { string } from "prop-types";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "../providers/DarkThemeProvider";

const PageHeader = ({ title, subtitle }) => {
  const { isDark } = useTheme();
  return (
    <Box pt={2}>
      <Typography
        sx={{
          color: isDark ? "#e3f2fd" : "#1a0033",
          fontFamily: "Oswald, sans-serif",
        }}
        variant="h2"
        component="h1"
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: isDark ? "#e3f2fd" : "#1a0033",
          fontFamily: "Oswald, sans-serif",
        }}
        variant="h5"
        component="h2"
      >
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }}></Divider>
    </Box>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
};
export default PageHeader;
