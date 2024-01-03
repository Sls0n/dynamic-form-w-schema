import classes from "./Label.module.css";

export function Label({ children, htmlFor, ...props }) {
  return (
    <label className={classes.label} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
}
