import Joi from "joi";
import { func, object } from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { storage } from "../../firebase/firebaseStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadAudioToFirebase = async (audio) => {
  const audioRef = ref(storage, `Mp3 Storage/${audio.name}`);
  const audioBlob = await audio.blob();
  await uploadBytes(audioRef, audioBlob);
  const downloadURL = await getDownloadURL(audioRef);
  return downloadURL;
};
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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Files:", e.target.files);
      const file = e.target.files[0];
      if (file) {
        try {
          const downloadURL = await uploadAudioToFirebase(file);
          console.log("Download URL:", downloadURL);
          const formDataWithAudioURL = { ...formData, audio: downloadURL };
          handleSubmit(formDataWithAudioURL);
        } catch (error) {
          setFormErrors((prev) => ({
            ...prev,
            audio: "Failed to upload file",
          }));
        }
      } else {
        handleSubmit(formData);
      }
    },
    [formData, handleSubmit]
  );
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
