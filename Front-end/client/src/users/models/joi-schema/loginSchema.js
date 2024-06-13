import Joi from "joi";

const loginSchema = {
  email: Joi.string()
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: "Please enter a valid email" })
    .required(),
  password: Joi.string()
    .ruleset.pattern(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .rule({
      message:
        "7 to 20 characters At least 1 uppercase letter At least 1 lowercase letter At least 1 number At least 1 special character from !@#$%^&*-",
    })
    .required(),
};

export default loginSchema;
