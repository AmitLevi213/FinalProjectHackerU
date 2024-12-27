import { func, object, string } from "prop-types";
import FormComponent from "../../../forms/components/FormComponent";
import InputComponent from "../../../forms/components/InputComponent";
import ROUTES from "../../../routes/routesModel";

const EditUserForm = ({
  onSubmit,
  onReset,
  errors,
  data,
  onFormChange,
  onInputChange,
  title,
}) => {
  return (
    <FormComponent
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.CARDS}
    >
      <InputComponent
        name="first"
        label="First Name"
        error={errors.first}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="middle"
        label="Middle Name"
        error={errors.middle}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <InputComponent
        name="last"
        label="Last Name"
        error={errors.last}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="phone"
        label="Phone"
        type="phone"
        error={errors.phone}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="url"
        label="Image Url"
        error={errors.url}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <InputComponent
        name="alt"
        label="Image Alt"
        error={errors.alt}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <InputComponent
        name="state"
        label="state"
        error={errors.state}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <InputComponent
        name="country"
        label="country"
        error={errors.country}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="city"
        label="city"
        error={errors.city}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="street"
        label="street"
        error={errors.street}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="houseNumber"
        label="houseNumber"
        type="number"
        error={errors.houseNumber}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="zip"
        label="zip"
        type="number"
        error={errors.zip}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
    </FormComponent>
  );
};

EditUserForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  title: string.isRequired,
};

export default EditUserForm;
