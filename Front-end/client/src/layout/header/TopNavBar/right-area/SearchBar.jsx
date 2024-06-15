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
            backgroundColor: isDark ? "#d16aff" : "#F9FAFD",
            color: "#1D1B26 ",
          }}
          placeholder="Search"
          size="small"
          value={searchParams?.get("q") ?? ""}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
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
