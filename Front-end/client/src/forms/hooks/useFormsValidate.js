import Joi from "joi";
import { func, object } from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { storage } from "../../firebase/firebaseStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadAudioToFirebase(audio) {
  const fileName = audio;

  const storageRef = ref(storage, `Mp3-Storage/${fileName}`);
  const metadata = { contentType: "audio/mpeg" };
  try {
    await uploadBytes(storageRef, audio, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Firebase URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Failed to upload file to Firebase:", error);
    throw new Error("Failed to upload file to Firebase");
  }
}

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
      console.log("Audio file:", formData.audio); // Check for file

      const validationError = validateForm();
      if (validationError) {
        setFormErrors((prev) => ({
          ...prev,
          general: validationError.details[0].message,
        }));
        return;
      }

      const file = formData.audio;
      if (file) {
        try {
          const downloadURL = await uploadAudioToFirebase(file);
          const formDataWithAudioURL = { ...formData, audio: downloadURL };
          handleSubmit(formDataWithAudioURL);
        } catch (error) {
          setFormErrors((prev) => ({
            ...prev,
            audio: "Failed to upload file",
          }));
        }
      } else {
        handleSubmit(formData); // Submit without audio if no file selected
      }
    },
    [formData, handleSubmit, validateForm]
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
