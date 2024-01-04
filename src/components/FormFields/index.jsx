import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { RadioField } from "./RadioField";
import { TextAreaField } from "./TextAreaField";
import { FileInputField } from "./FileField";

const fieldComponents = {
  text: InputField,
  number: InputField,
  select: SelectField,
  radio: RadioField,
  textarea: TextAreaField,
  file: FileInputField,
};

export const generateFormFields = (
  schema,
  formData,
  handleChange,
  handleBlur,
  errors
) => {
  return schema.map((field) => {
    const FieldComponent = fieldComponents[field.type];

    const commonProps = {
      id: field.name,
      type: field.type,
      name: field.name,
      handleChange,
      error: errors[field.name],
    };

    switch (field.type) {
      case "radio":
        return (
          <FieldComponent
            key={field.name}
            value={formData[field.name] || ""}
            options={field.options || undefined}
            checked={formData[field.name] || undefined}
            {...commonProps}
          >
            {field.label}
          </FieldComponent>
        );
      case "select":
        return (
          <FieldComponent
            key={field.name}
            value={formData[field.name] || ""}
            options={field.options || undefined}
            handleBlur={handleBlur}
            {...commonProps}
          >
            {field.label}
          </FieldComponent>
        );
      case "file":
        return (
          <FieldComponent
            key={field.name}
            value={formData[field.name] || ""}
            {...commonProps}
          >
            {field.label}
          </FieldComponent>
        );
      default:
        return (
          <FieldComponent
            key={field.name}
            value={formData[field.name] || ""}
            placeholder={field.placeholder}
            {...commonProps}
          >
            {field.label}
          </FieldComponent>
        );
    }
  });
};
