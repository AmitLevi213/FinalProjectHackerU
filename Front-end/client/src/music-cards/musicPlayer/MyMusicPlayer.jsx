import { useState, useEffect, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useTheme } from "../../providers/DarkThemeProvider";
import { IconButton, Slider, Box, Grid, Typography } from "@mui/material";

const MyMusicPlayer = ({ currentIndex, setCurrentIndex, audioFiles }) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (audioFiles.length > 0) {
      setIsLoading(true);
      audioRef.current.src = audioFiles[currentIndex].audio;
      audioRef.current.volume = volume / 100;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [audioFiles, currentIndex]);

  useEffect(() => {
    const updateDuration = () => {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    };

    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener("loadedmetadata", updateDuration);
    audioRef.current.addEventListener("timeupdate", updateTime);

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVolumeChange = (newValue) => {
    if (isFinite(newValue)) {
      setVolume(newValue);
      audioRef.current.volume = newValue / 100;
      setIsMuted(newValue === 0);
    }
  };

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
      setVolume(50);
    } else {
      setIsMuted(true);
      audioRef.current.muted = true;
      setVolume(0);
    }
  };

  const handleSkipNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handleSkipPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + audioFiles.length) % audioFiles.length
    );
  };

  const handleTimestampChange = (newValue) => {
    if (isFinite(newValue)) {
      setCurrentTime(newValue);
      audioRef.current.currentTime = newValue;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const iconColor = isDark ? "#e3f2fd" : "#1a0033";

  return (
    <Box
      sx={{
        background: isDark ? "#1a0033" : "#e3f2fd",
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 1)",
        padding: "15px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "650px",
        margin: "auto",
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="body1"
          sx={{
            color: iconColor,
            fontFamily: "'Permanent Marker', cursive",
          }}
        >
          {audioFiles[currentIndex]?.songTitle || "Unknown Title"} -{" "}
          {audioFiles[currentIndex]?.artist || "Unknown Artist"}
        </Typography>
      </Box>
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="nowrap"
      >
        <Grid item>
          <IconButton onClick={handleSkipPrevious} sx={{ color: iconColor }}>
            <SkipPreviousIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handlePlayPause}
            sx={{ color: iconColor }}
            disabled={isLoading}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={handleSkipNext} sx={{ color: iconColor }}>
            <SkipNextIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
          <Slider
            value={currentTime}
            max={isNaN(duration) ? 0 : duration}
            onChange={(e, newValue) => handleTimestampChange(newValue)}
            aria-labelledby="timestamp-slider"
            sx={{ color: iconColor, mt: 2 }}
          />
          <Grid container justifyContent="space-between">
            <Typography
              variant="caption"
              sx={{ color: iconColor, fontFamily: "Oswald, sans-serif" }}
            >
              {formatTime(currentTime)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: iconColor, fontFamily: "Oswald, sans-serif" }}
            >
              {formatTime(duration)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item alignItems="center">
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
        <Grid item xs={3}>
          <Slider
            value={volume}
            onChange={(e, newValue) => handleVolumeChange(newValue)}
            aria-labelledby="volume-slider"
            sx={{
              color: iconColor,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyMusicPlayer;
