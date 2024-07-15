import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { bool, func, object, string } from "prop-types";
import { makeFirstLetterCapital } from "../utils/upperCaseMethod";
import { useTheme } from "../../providers/DarkThemeProvider";

const InputComponent = ({
  variant,
  type,
  name,
  data,
  label,
  required,
  error,
  handleChange,
  labelColor,
  multiline,
  rows,
  ...rest
}) => {
  const { isDark } = useTheme();

  return (
    <Grid item xs={12} {...rest}>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={type}
        id={name}
        name={name}
        value={data[name] ? data[name] : ""}
        required={required}
        helperText={error}
        error={Boolean(error)}
        onChange={handleChange}
        fullWidth
        autoComplete="off"
        multiline={multiline}
        rows={rows}
        sx={{
          backgroundColor: isDark ? "#1a0033" : "#e3f2fd",
          "& .MuiInputLabel-root": {
            color: isDark ? "#ffffff" : "#310047",
          },
        }}
      />
    </Grid>
  );
};

InputComponent.propTypes = {
  name: string.isRequired,
  required: bool.isRequired,
  type: string.isRequired,
  error: string,
  handleChange: func.isRequired,
  variant: string,
  data: object.isRequired,
  labelColor: string,
  multiline: bool,
  rows: string,
};

InputComponent.defaultProps = {
  variant: "outlined",
  type: "text",
  required: true,
  multiline: false,
  rows: "1",
};

export default InputComponent;
