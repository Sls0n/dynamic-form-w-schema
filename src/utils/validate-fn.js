const isRequired = (value, field) => field.validation?.required && !value
const isMinLength = (value, field) => field.validation?.minLength && value.length < field.validation.minLength
const isMaxLength = (value, field) => field.validation?.maxLength && value.length > field.validation.maxLength
const isMin = (value, field) => field.validation?.min && value < field.validation.min
const isMax = (value, field) => field.validation?.max && value > field.validation.max
const isPatternError = (value, field) => field.validation?.pattern && !field.validation.pattern.test(value)

const validateField = (value, field) => {
  // if from all the errors, one is true, then the field is invalid
  const error = isRequired(value, field) || isMinLength(value, field) || isMaxLength(value, field) || isMin(value, field) || isMax(value, field) || isPatternError(value, field)

  return error ? field.errorMessage : ''
}

export const validate = (
  formData,
  schema,  
) => {
  const newError = {};
  let isValid = true;

  schema.forEach((field) => {
   const value = formData[field.name];

   const error = validateField(value, field)

   if (error) {
      newError[field.name] = error;
      isValid = false;
   }
  });

  return {
    isValid,
    errors: newError,
  }
};