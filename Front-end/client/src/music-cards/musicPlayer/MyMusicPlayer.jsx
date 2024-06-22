import { useState, useEffect, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useTheme } from "../../providers/DarkThemeProvider";
import { storage } from "../../firebase/firebaseStore";
import { getDownloadURL, listAll, ref, getMetadata } from "firebase/storage";
import { IconButton, Slider, Box, Grid } from "@mui/material";

const MyMusicPlayer = () => {
  const { isDark } = useTheme();
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const listRef = ref(storage, "/");
        const res = await listAll(listRef);
        const audioFilePromises = res.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          if (metadata.contentType === "audio/mpeg") {
            const url = await getDownloadURL(itemRef);
            return url;
          }
          return null;
        });

        const audioUrls = await Promise.all(audioFilePromises);
        setAudioFiles(audioUrls.filter((url) => url !== null));
      } catch (error) {
        console.error("Failed to fetch audio files:", error);
      }
    };

    fetchAudioFiles();
  }, []);

  useEffect(() => {
    if (audioFiles.length > 0) {
      audioRef.current.src = audioFiles[currentIndex];
      audioRef.current.volume = volume / 100;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [audioFiles, currentIndex]);

  useEffect(() => {
    const updateDuration = () => {
      setDuration(audioRef.current.duration);
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
  }, [audioFiles, currentIndex]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
    setIsMuted(newValue === 0);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleSkipNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handleSkipPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + audioFiles.length) % audioFiles.length
    );
  };

  const handleTimestampChange = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
  };

  const iconColor = isDark ? "#d16aff" : "#F4FDFF";

  return (
    <Box
      sx={{
        background: isDark
          ? "linear-gradient(135deg, #4B0082 30%, #7F00FF 70%)"
          : "linear-gradient(135deg, #9c27b0 30%, #7b1fa2 80%)",
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.5)",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <IconButton onClick={handleSkipPrevious} sx={{ color: iconColor }}>
            <SkipPreviousIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={handlePlayPause} sx={{ color: iconColor }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={handleSkipNext} sx={{ color: iconColor }}>
            <SkipNextIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            value={currentTime}
            max={isNaN(duration) ? 0 : duration}
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
        <Grid item xs>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
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
