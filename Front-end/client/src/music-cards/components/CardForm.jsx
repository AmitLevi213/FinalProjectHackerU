import { func, object } from "prop-types";
import ROUTES from "../../routes/routesModel";
import InputComponent from "../../forms/components/InputComponent";
import FormComponent from "../../forms/components/FormComponent";
import "./CardForm.css";
import { useTheme } from "../../providers/DarkThemeProvider";
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
  const { isDark } = useTheme();
  const textColor = isDark ? "#e3f2fd" : "#1a0033";

  const formattedData = {
    ...data,
    releaseYear: data.releaseYear ? formatDate(data.releaseYear) : "",
    genre: Array.isArray(data.genre) ? data.genre.join(", ") : "",
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    onInputChange({
      target: {
        name: "genre",
        value: value.split(",").map((genre) => genre.trim()),
      },
    });
  };



  return (
    <FormComponent
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.MUSIC}
      showGoogleButton={false}
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
        label="Artist"
        error={errors.artist}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="releaseYear"
        label="Release Year"
        error={errors.releaseYear}
        handleChange={onInputChange}
        type="date"
        data={formattedData}
        sm={6}
        className={isDark ? "dark-theme" : "light-theme"}
      />
      <InputComponent
        name="album"
        label="Album"
        error={errors.album}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="genre"
        label="Genre"
        error={errors.genre}
        handleChange={handleGenreChange}
        data={formattedData}
        required={true}
        sm={6}
      />
      <InputComponent
        name="duration"
        label="Duration"
        error={errors.duration}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="trackNumber"
        label="Track Number"
        type="number"
        error={errors.trackNumber}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="description"
        label="Description"
        error={errors.description}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="webUrl"
        label="Web URL"
        error={errors.webUrl}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="imageUrl"
        label="Image URL"
        error={errors.imageUrl}
        handleChange={onInputChange}
        data={data}
        sm={6}
      />
      <InputComponent
        name="imageAlt"
        label="Image Alt"
        error={errors.imageAlt}
        handleChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <InputComponent
        name="lyrics"
        label="Lyrics"
        error={errors.lyrics}
        handleChange={onInputChange}
        data={data}
        required={false}
        sm={6}
        multiline={true}
        rows="3"
      />

      <div
        className="custom-file-input"
        style={{
          color: textColor,
        }}
      >
        <input
          type="file"
          name="audio"
          onChange={onInputChange}
          className="custom-file-input"
          required
          data={data}
        />
        Choose File
      </div>
    </FormComponent>
  );
};

CardForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  data: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
};

export default CardForm;
