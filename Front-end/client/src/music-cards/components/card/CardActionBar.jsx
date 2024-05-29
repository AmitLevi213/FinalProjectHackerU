import { CardActions, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModeIcon from "@mui/icons-material/Edit";
import ROUTES from "../../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../users/providers/UserProvider";
import useMusic from "../../hooks/useMusic";
import { useEffect, useState } from "react";
import CardDeleteDialog from "../card/CardDeleteDialog";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
const CardActionBar = ({ card, onDeleteCard, onLike }) => {
  const { audio } = card;
  const { handleLikeCard } = useMusic();
  const [isDialogOpen, setIsDialog] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInstance, setAudioInstance] = useState(null);

  const playOrPauseMusic = () => {
    const audioEl = new Audio(audio);
    setAudioInstance(audioEl);

    return () => {
      audioEl.pause();
      audioEl.currentTime = 0;
    };
  };

  useEffect(() => {
    const cleanup = playOrPauseMusic();

    // Clean up the audio instance when the component unmounts
    return () => cleanup();
  }, [audio]);

  const navigate = useNavigate();
  const { user } = useUser();

  const handleToggle = () => {
    setIsPlaying((prevState) => {
      const newState = !prevState;
      if (audioInstance) {
        if (newState) {
          audioInstance.play();
        } else {
          audioInstance.pause();
        }
      }
      return newState;
    });
  };
  const handleDialog = (term) => {
    if (term === "open") setIsDialog(true);
    else setIsDialog(false);
  };

  const handleDeleteCard = () => {
    handleDialog();
    onDeleteCard(card._id);
  };

  const handleLike = async () => {
    setLiked((prev) => !prev);
    await handleLikeCard(card._id);
    await onLike();
  };

  const [isLiked, setLiked] = useState(
    () => !!user && !!card.likes.find((id) => id === user._id)
  );

  return (
    <>
      <CardActions
        disableSpacing
        sx={{ paddingTop: 0, justifyContent: "space-between" }}
      >
        <Box>
          {user && (user._id === card.user_id || user.isAdmin) && (
            <IconButton
              onClick={() => {
                return handleDialog("open");
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          {user && user._id === card.user_id && (
            <IconButton
              onClick={() => navigate(`${ROUTES.EDIT_MUSIC}/${card._id}`)}
            >
              <EditModeIcon />
            </IconButton>
          )}
        </Box>
        <Box>
          <IconButton onClick={handleToggle}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          {user && (
            <IconButton onClick={handleLike}>
              <FavoriteIcon color={isLiked ? "error" : "inherit"} />
            </IconButton>
          )}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onDelete={handleDeleteCard}
        onChangeDialog={handleDialog}
      />
    </>
  );
};

export default CardActionBar;
