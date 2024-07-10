import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import StandardImageList from "../components/StandardGamesList";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from "../AuthContext";

// import styles from "./css/aboutme.module.css";
// import Image from 'next/image';

function SnakeGamePopup({ game, open, onOpen, onClose, onLaunch }) {
    const theme = useTheme();
    console.log(game);
    console.log(game.title);

    const handleLaunch = async () => {
      try {
        console.log(game);
        await onLaunch();
  
      } catch(error) {
        console.log(game);
        alert("Erreur au lancement du jeu", game.title);
      }
    }

    return (
        <Grid > 
         <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            onClick={onOpen}
          >
            <PlayArrowIcon />
          </IconButton>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Let's play to the {game.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can click on play to launch the game ! 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>I won't play</Button>
              <Button onClick={handleLaunch}>Play</Button>
            </DialogActions>
          </Dialog>
        </Grid>
    );
};

export default SnakeGamePopup;