import classes from "./ErrorMessage.module.css";

export const ErrorMessage = ({ error }) => {
  return <>{error && <p className={classes.error}>{error}</p>}</>;
};
