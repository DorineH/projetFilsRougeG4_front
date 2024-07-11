import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import StandardImageList from "../components/StandardGamesList";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from "../AuthContext";

// import styles from "./css/aboutme.module.css";
// import Image from 'next/image';

function GamePopup({ game, open, onOpen, onClose, onLaunch }) {
    const theme = useTheme();
    const { user, scoreSnakeGame} = useAuth();

    const handleLaunch = async () => {
      try {
        const score = await onLaunch();
        console.log('score1111 ', score);
        
        if (user) {
          await scoreSnakeGame(user.pseudo,  score);
          alert('Votre score est ', score, ' !');
        } else {
          alert("Utilisateur non trouvé !");
        }
  
      } catch(error) {
        console.log("Erreur au lancement du jeu");
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

export default GamePopup;