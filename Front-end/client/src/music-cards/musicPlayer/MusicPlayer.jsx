import { Typography } from "@mui/material";
import { useTheme } from "../../providers/DarkThemeProvider";
import "./musicPlayer.css";

const MusicPlayer = ({ card }) => {
  const { isDark } = useTheme();
  const { songTitle, artist, audio } = card;

  return (
    <div className="music-player-container">
      <Typography variant="h5" color={isDark ? "lightgray" : "textScondary"}>
        {songTitle}- {artist}
      </Typography>
      <audio controls className="custom-audio-player">
        <source src={audio} type="audio/mpeg" />
      </audio>
    </div>
  );
};
export default MusicPlayer;
