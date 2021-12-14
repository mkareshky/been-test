import React from "react";
import { TextField } from "@mui/material";

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type = "text",
  ...props
}) => (
  <div>
    <TextField type={type} {...field} {...props} />
  </div>
);
