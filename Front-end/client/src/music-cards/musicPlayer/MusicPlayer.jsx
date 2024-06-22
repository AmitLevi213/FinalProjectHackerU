import { useState, useEffect, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Typography, IconButton, Slider, Box, Grid } from "@mui/material";
import { useTheme } from "../../providers/DarkThemeProvider";
import { makeFirstLetterCapital } from "../../forms/utils/upperCaseMethod";
import "./musicPlayer.css";

const MusicPlayer = ({ card }) => {
  const { songTitle, artist, audio, lyrics } = card;
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio(audio));
  const myColor = isDark ? "#d16aff" : "#F4FDFF";
  const iconColor = isDark ? "#d16aff" : "#F4FDFF";

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    audioRef.current.src = audio;
  }, [audio]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener("timeupdate", updateTime);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleTimestampChange = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
  };

  return (
    <div
      style={{
        background: isDark
          ? "linear-gradient(135deg, #4B0082 30%, #7F00FF 70%)"
          : "linear-gradient(135deg, #9c27b0 30%, #7b1fa2 80%)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.5)",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" color={iconColor}>
        {makeFirstLetterCapital(songTitle)} - {makeFirstLetterCapital(artist)}
      </Typography>
      <Box mt={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <IconButton onClick={handlePlayPause} sx={{ color: myColor }}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Grid>
          <Grid item xs>
            <Slider
              value={currentTime}
              max={audioRef.current.duration}
              onChange={handleTimestampChange}
              aria-labelledby="timestamp-slider"
              sx={{ color: iconColor }}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={handleMute} sx={{ color: iconColor }}>
              {isMuted ? (
                <VolumeMuteIcon />
              ) : volume > 50 ? (
                <VolumeUpIcon />
              ) : (
                <VolumeDownIcon />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <div className="lyrics-container" style={{ marginTop: "20px" }}>
        {lyrics.map((line, index) => (
          <Typography key={index} variant="body1" style={{ color: myColor }}>
            {line}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
