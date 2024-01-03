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

export const generateFormFields = (schema, formData, handleChange, errors) => {
  return schema.map((field) => {
    const FieldComponent = fieldComponents[field.type];
    return (
      <FieldComponent
        key={field.name}
        id={field.name}
        type={field.type}
        name={field.name}
        value={formData[field.name] || ""}
        handleChange={handleChange}
        placeholder={field.placeholder}
        error={errors[field.name]}
        options={field.options || undefined}
        checked={formData[field.name] || undefined}
      >
        {field.label}
      </FieldComponent>
    );
  });
};
