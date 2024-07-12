import React, { useState } from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import StandardImageList from "../components/StandardGamesList";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from "../AuthContext";

// import styles from "./css/aboutme.module.css";
// import Image from 'next/image';

function GamePopup({ game, open, onOpen, onClose, onLaunch }) {
    const theme = useTheme();
    // const { user, scoreSnakeGame} = useAuth();
  

    const handleLaunch = async () => {
      try {
        console.log('rrrrrrrrrrrrrrrrrrr');
        await onLaunch();
        
        // if (user) {
        //   await scoreSnakeGame(user.pseudo,  scores);
        //   alert('Votre score est ', scores, ' !');
        // } else {
        //   alert("Utilisateur non trouvé !");
        // }
  
      } catch(error) {
        console.log("Erreur au lancement du jeu");
        alert("Erreur au lancement du jeu", game.title);
      }
    }

    return (
        <Grid> 
         <IconButton
            sx={{ color: '#8fbc8b' }}
            onClick={onOpen}
          >
            <PlayArrowIcon />
          </IconButton>
          <Dialog open={open} onClose={onClose} >
            <DialogTitle>Let's play to the {game.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vous pouvez mainteant commencer à jouer ! 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Annuler</Button>
              <Button onClick={handleLaunch}>Play</Button>
            </DialogActions>
          </Dialog>
        </Grid>
    );
};

export default GamePopup;