export const validate = (
  formData,
  schema,
  setErrors
  
) => {
  const newError = {};
  let isValid = true;

  schema.forEach((field) => {
    if (field.validation?.required && !formData[field.name]) {
      newError[field.name] = field.errorMessage;
      isValid = false;
    }

    if (
      field.validation?.minLength &&
      formData[field.name]?.length < field.validation.minLength
    ) {
      newError[field.name] = field.errorMessage;
      isValid = false;
    }

    if (
      field.validation?.maxLength &&
      formData[field.name]?.length > field.validation.maxLength
    ) {
      newError[field.name] = field.errorMessage;
      isValid = false;
    }

    if (
      field.validation?.min &&
      formData[field.name] < field.validation.min
    ) {
      newError[field.name] = field.errorMessage;
      isValid = false;
    }

    if (
      field.validation?.max &&
      formData[field.name] > field.validation.max
    ) {
      newError[field.name] = field.errorMessage;
      isValid = false;
    }

    if (
      field.validation?.pattern &&
      !field.validation.pattern.test(formData[field.name])
    ) {
      newError[field.name] = field.errorMessage;
      isValid = false;
    }
  });

  setErrors(newError);
  return isValid;
};