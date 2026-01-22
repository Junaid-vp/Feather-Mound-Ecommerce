import React from "react";
import * as Yup from "yup";
export const LoginValidation = Yup.object({
  email: Yup.string().email("Invalid Email").required("Enter Correct Email"),
  password: Yup.string()
    .min(6, "Password must be minimum 6 characters")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //   "Password must include uppercase, lowercase, number and special character"
    // )
    .required("Enter Correct Password"),
});
