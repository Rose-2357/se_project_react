import { useState } from "react";
import { checkValidity, displayValid } from "../utils/validation";

export function useForm(defaultValues, additionalValidityFunctions = {}) {
  const defaultErrors = {};
  Object.keys(defaultValues).forEach((key) => {
    defaultErrors[key] = {
      error: true,
      message: "",
    };
  });

  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);

  function hasAdditionalFunction(str) {
    return Object.keys(additionalValidityFunctions).some((key) => key === str);
  }

  function resetForm() {
    Object.keys(values).forEach((key) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: "",
      }));
      setErrors(defaultErrors);
    });
  }

  function handleBlur(e) {
    checkValidity(
      e,
      errors,
      setErrors,
      hasAdditionalFunction(e.target.name)
        ? additionalValidityFunctions[e.target.name]
        : null,
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((preValues) => ({ ...preValues, [name]: value }));
    displayValid(e, errors, setErrors);
  }

  return {
    values,
    handleChange,
    setValues,
    errors,
    handleBlur,
    setErrors,
    resetForm,
  };
}
