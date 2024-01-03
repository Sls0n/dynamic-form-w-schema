import React from "react";
import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../Label";
import classes from "./TextAreaField.module.css";

export const TextAreaField = ({
  id,
  type,
  name,
  value,
  handleChange,
  placeholder,
  children,
  error,
}) => {
  return (
    <div className={classes.textarea__field}>
      <Label htmlFor={id}>{children}</Label>
      <textarea
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={classes["textarea__field-input"]}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
