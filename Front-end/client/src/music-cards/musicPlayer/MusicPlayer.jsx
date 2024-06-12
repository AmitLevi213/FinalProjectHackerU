import { Typography } from "@mui/material";
import { useTheme } from "../../providers/DarkThemeProvider";
import "./musicPlayer.css";

const MusicPlayer = ({ card }) => {
  const { isDark } = useTheme();
  const { songTitle, artist, audio, lyrics } = card;

  return (
    <div
      className="music-player-container"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #4B0082 30%, #7F00FF 70%)"
          : "linear-gradient(135deg, #9c27b0 30%, #7b1fa2 80%)",
      }}
    >
      <Typography variant="h5" color={isDark ? "lightgray" : "textSecondary"}>
        {songTitle} - {artist}
      </Typography>
      <audio controls className="custom-audio-player">
        <source src={audio} type="audio/mpeg" />
      </audio>
      <div className="lyrics-container">
        {lyrics.map((line, index) => (
          <Typography key={index} variant="body1" className="lyrics-line">
            {line}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
