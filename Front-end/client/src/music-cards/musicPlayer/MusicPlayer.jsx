import React, { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./musicPlayer.css";
const MusicPlayer = ({ audioSrc, card }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const { songTitle, artist } = card;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const handleVolumeChange = (event, newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="music-player">
      <div className="song-info">
        <h3>{songTitle}</h3>
        <p>{artist}</p>
      </div>
      <div className="controls">
        <button type="button" onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => handleVolumeChange(event, event.target.value)}
        />
        <button type="button">
          {volume > 0.5 ? <VolumeUpIcon /> : <VolumeDownIcon />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
