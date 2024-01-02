import React from "react";
import classes from "./Label.module.css";

export function Label({ children, htmlFor, ...props }) {
  return (
    <label
      className={classes["form__field-label"]}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
}
