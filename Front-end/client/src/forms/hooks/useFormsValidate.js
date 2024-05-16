import Joi from "joi";
import { func, object } from "prop-types";
import { useCallback, useMemo, useState } from "react";

const useFormsValidate = (initialForm, schema, handleSubmit) => {
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  const handleFormReset = useCallback(() => {
    setFormData(initialForm);
    setFormErrors({});
  }, [initialForm]);

  const validateFormProperty = useCallback(
    ({ name, value }) => {
      const object = { [name]: value };
      const genSchema = Joi.object({ [name]: schema[name] });
      const { error } = genSchema.validate(object);
      return error ? error.details[0].message : null;
    },
    [schema]
  );

  const handleChange = useCallback(
    (e) => {
      const target = e.target;
      const { name, value } = target;
      const errorMessage = validateFormProperty({ name, value });
      if (errorMessage)
        setFormErrors((prev) => ({ ...prev, [name]: errorMessage }));
      else
        setFormErrors((prev) => {
          const pbj = { ...prev };
          delete pbj[name];
          return pbj;
        });
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [validateFormProperty]
  );
  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema);
    const { error } = schemaForValidate.validate(formData);
    if (error) return error;
    return null;
  }, [formData, schema]);

  const onSubmit = useCallback(() => {
    handleSubmit(formData);
  }, [formData, handleSubmit]);

  const value = useMemo(() => {
    return { formData, formErrors };
  }, [formData, formErrors]);
  return {
    handleFormReset,
    handleChange,
    validateForm,
    onSubmit,
    setFormData,
    value,
  };
};

useFormsValidate.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired,
};

export default useFormsValidate;
