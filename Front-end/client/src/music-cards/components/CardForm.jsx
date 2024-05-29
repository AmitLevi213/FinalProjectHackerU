import { func, object } from "prop-types";
import ROUTES from "../../routes/routesModel";
import InputComponent from "../../forms/components/InputComponent";
import FormComponent from "../../forms/components/FormComponent";

export const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
const CardForm = ({
  onSubmit,
  onReset,
  errors,
  data,
  onFormChange,
  onInputChange,
  title,
}) => {
  const formattedData = {
    ...data,
    releaseYear: data.releaseYear ? formatDate(data.releaseYear) : "",
  };
  return (
    <FormComponent
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.MUSIC}
    >
      <InputComponent
        name="songTitle"
        label="Song Title"
        error={errors.songTitle}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="artist"
        label="artist"
        error={errors.artist}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="releaseYear"
        label="release Year"
        error={errors.releaseYear}
        handleChange={onInputChange}
        type="date"
        data={formattedData}
        sm={6}
      />
      <InputComponent
        name="album"
        label="album"
        error={errors.album}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="genre"
        label="genre"
        error={errors.genre}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />

      <InputComponent
        name="duration"
        label="duration"
        error={errors.duration}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="trackNumber"
        label="Track Number"
        error={errors.trackNumber}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="description"
        label="description"
        error={errors.description}
        handleChange={onInputChange}
        data={data}
        required={false}
        sm={6}
      />

      <InputComponent
        name="webUrl"
        label="web"
        error={errors.webUrl}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />

      <InputComponent
        name="imageUrl"
        label="image url"
        error={errors.imageUrl}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="imageAlt"
        label="image alt"
        error={errors.imageAlt}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <InputComponent
        name="lyrics"
        label="lyrics"
        error={errors.lyrics}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="audio"
        label="Song File"
        error={errors.audio}
        type="file"
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={true}
      />
    </FormComponent>
  );
};

CardForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
};

export default CardForm;
