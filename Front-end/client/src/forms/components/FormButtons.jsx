import Button from "@mui/material/Button";
import { bool, func, node, string } from "prop-types";
import { useTheme } from "../../providers/DarkThemeProvider";
const FormButton = ({
  variant,
  component,
  size,
  color,
  onClick,
  disabled,
  node,
}) => {
  const { isDark } = useTheme();
  return (
    <Button
      variant={variant}
      component={component}
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
      fullWidth
      sx={{
        backgroundColor: isDark ? "#1a0033" : "#e3f2fd",
        color: isDark ? "#e3f2fd" : "#1a0033",
        borderColor: isDark
          ? "linear-gradient(135deg, #4B0082 30%, #7F00FF 70%)"
          : "linear-gradient(135deg, #9c27b0 30%, #7b1fa2 80%)",
        "&:hover": {
          backgroundColor: isDark ? "#451d63" : "#bbdefb",
          borderColor: isDark ? "#fff" : "#000",
        },
      }}
    >
      {node}
    </Button>
  );
};

FormButton.propTypes = {
  variant: string.isRequired,
  component: string.isRequired,
  size: string.isRequired,
  color: string.isRequired,
  onClick: func.isRequired,
  disabled: bool.isRequired,
  node: node.isRequired,
};

FormButton.defaultProps = {
  variant: "contained",
  component: "button",
  size: "medium",
  color: "primary",
  disabled: false,
};

export default FormButton;
