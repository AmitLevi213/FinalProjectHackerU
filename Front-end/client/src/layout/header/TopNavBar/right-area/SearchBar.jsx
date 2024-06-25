import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../../../providers/DarkThemeProvider";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = ({ target }) => setSearchParams({ q: target.value });

  return (
    <Box display="inline-flex">
      <FormControl variant="standard">
        <OutlinedInput
          sx={{
            backgroundColor: isDark ? "#e3f2fd" : "#1a0033",
            color: isDark ? "#1a0033" : "#ffffff",
          }}
          placeholder="Search"
          size="small"
          value={searchParams?.get("q") ?? ""}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                sx={{ color: isDark ? "#1a0033" : "#ffffff" }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
