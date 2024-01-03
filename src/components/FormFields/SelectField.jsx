import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../Label";
import classes from "./SelectField.module.css";

export const SelectField = ({
  id,
  name,
  value,
  handleChange,
  children,
  error,
  options,
}) => {
  return (
    <div className={classes.select__field}>
      <Label htmlFor={id}>{children}</Label>
      <select
        className={classes["select__field-select"]}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option !== "" ? option : "Select an option"}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
};
