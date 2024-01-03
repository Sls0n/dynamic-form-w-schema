import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../Label";
import classes from "./RadioField.module.css";

export const RadioField = ({
  id,
  name,
  handleChange,
  children,
  error,
  options,
  checked,
}) => {
  return (
    <div className={classes.radio__field}>
      <Label htmlFor={id}>{children}</Label>
      {options.map((option) => (
        <div className={classes["radio__field-options"]} key={option}>
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            onChange={handleChange}
            checked={checked === option}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <ErrorMessage error={error} />
    </div>
  );
};
