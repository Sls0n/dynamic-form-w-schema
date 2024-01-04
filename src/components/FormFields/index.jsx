import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { RadioField } from "./RadioField";
import { TextAreaField } from "./TextAreaField";

const fieldComponents = {
  text: InputField,
  number: InputField,
  select: SelectField,
  radio: RadioField,
  textarea: TextAreaField,
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
      handleBlur,
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
