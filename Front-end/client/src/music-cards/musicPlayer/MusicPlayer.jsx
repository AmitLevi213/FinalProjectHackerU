import "./MusicPlayer.css";

const MusicPlayer = ({ card }) => {
  const { songTitle, artist, audio } = card;

  return (
    <div className="music-player-container">
      <h2>
        {songTitle} - {artist}
      </h2>
      <audio controls className="custom-audio-player">
        <source src={audio} type="audio/mpeg" />
      </audio>
    </div>
  );
};
export default MusicPlayer;
