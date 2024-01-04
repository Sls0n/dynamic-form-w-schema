import React, { useState, useEffect } from "react";
import classes from "./FileField.module.css";
import { ErrorMessage } from "../ErrorMessage";
import { Label } from "../Label";

export const FileInputField = ({
  id,
  name,
  handleChange,
  error,
  value,
  children,
  ...props
}) => {
  const [preview, setPreview] = useState(value);

  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleFileChange = (event) => {
    handleChange(event);

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    handleChange({ target: { name, value: "" } });
  };

  return (
    <div className={classes["file__field"]}>
      <Label htmlFor={id}>{children}</Label>
      {!preview && (
        <input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          className={classes["file__field-input"]}
          {...props}
        />
      )}
      {preview && (
        <div className={classes["file__field-preview"]}>
          <img src={preview} alt="Preview" />
          <button type="button" onClick={handleRemove}>
            x
          </button>
        </div>
      )}
      <ErrorMessage error={error} />
    </div>
  );
};
