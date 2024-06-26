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
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(audio));
  const myColor = isDark ? "#e3f2fd" : "#1a0033";

  const audioRefCurrent = audioRef.current;

  useEffect(() => {
    const updateDuration = () => {
      setDuration(audioRefCurrent.duration);
    };

    const updateTime = () => {
      setCurrentTime(audioRefCurrent.currentTime);
    };

    audioRefCurrent.addEventListener("loadedmetadata", updateDuration);
    audioRefCurrent.addEventListener("timeupdate", updateTime);

    return () => {
      audioRefCurrent.removeEventListener("loadedmetadata", updateDuration);
      audioRefCurrent.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRefCurrent]);

  useEffect(() => {
    audioRefCurrent.volume = volume / 100;
  }, [volume, audioRefCurrent]);

  useEffect(() => {
    audioRefCurrent.src = audio;
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [audio, audioRefCurrent]);

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

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (newValue === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div
      style={{
        background: isDark ? "#1a0033" : "#e3f2fd",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.5)",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
        variant="h5"
      >
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
              max={isNaN(duration) ? 0 : duration}
              onChange={handleTimestampChange}
              aria-labelledby="timestamp-slider"
              sx={{ color: myColor }}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={handleMute} sx={{ color: myColor }}>
              {isMuted ? (
                <VolumeMuteIcon />
              ) : volume > 50 ? (
                <VolumeUpIcon />
              ) : (
                <VolumeDownIcon />
              )}
            </IconButton>
          </Grid>
          <Grid item xs>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-labelledby="volume-slider"
              sx={{ color: myColor }}
            />
          </Grid>
        </Grid>
      </Box>
      <div className="lyrics-container" style={{ marginTop: "20px" }}>
        {lyrics.map((line, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ color: myColor, fontFamily: "Oswald, sans-serif" }}
          >
            {line}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
