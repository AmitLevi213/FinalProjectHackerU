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
import { useTheme } from "../../../providers/DarkThemeProvider";

const CardActionBar = ({ card, onDeleteCard, onLike, isLiked }) => {
  const { audio } = card;
  const { handleLikeCard } = useMusic();
  const [isDialogOpen, setIsDialog] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInstance, setAudioInstance] = useState(null);
  const { isDark } = useTheme();
  const iconColor = isDark ? "#e3f2fd" : "#1a0033";

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
    await handleLikeCard(card._id, isLiked);
    onLike(card._id);
  };

  return (
    <>
      <CardActions
        disableSpacing
        sx={{ paddingTop: 0, justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          {user && (user._id === card.user_id || user.isAdmin) && (
            <IconButton
              sx={{ color: iconColor }}
              onClick={() => handleDialog("open")}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          )}
          {user && user._id === card.user_id && (
            <IconButton
              onClick={() => navigate(`${ROUTES.EDIT_MUSIC}/${card._id}`)}
              size="large"
            >
              <EditModeIcon sx={{ color: iconColor }} />
            </IconButton>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            sx={{ color: iconColor }}
            onClick={handleToggle}
            size="large"
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          {user && (
            <IconButton
              sx={{ color: iconColor }}
              onClick={handleLike}
              size="large"
            >
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
