import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import jeu_snake_vignette from '../assets/images/jeu_snake_vignette.jpg';
import tic_tac_toe_vignette from '../assets/images/tic_tac_toe_vignette.jpg';
import puissance4_vignette from '../assets/images/puissance4_vignette.jpg';
import memory_vignette from '../assets/images/memory_vignette.jpg'
import pac_man_vignette from '../assets/images/pac_man_vignette.png';
import quiz_vignette from '../assets/images/quiz_vignette.jpg'
import arcade_vignette from '../assets/images/arcade_vignette.jpg'
import arcade2_vignette from '../assets/images/arcade2_vignette.jpg'
import { Grid, ImageListItemBar, useTheme } from '@mui/material';
import { useAuth } from '../AuthContext';
import GamePopup from '../popup/GamePopup';

export default function StandardImageList() {
  const theme = useTheme();
  const [selectedGame, setSelectedGame] = React.useState(null);
  const { launchSnakegame } = useAuth();

  const handleOpenPopup = (game) => {
    setSelectedGame(game);
  };

  const handleClosePopup = () => {
    setSelectedGame(null);
  };

  const launchGame = async (game) => {
    try {
      switch (game.title) {
        case 'Snake Game':
          await launchSnakegame();
          handleClosePopup;
        break;
        case 'Tic Tac Toe':
          // mettre le lancement du jeu du tic tac toe
        break;

        default:
          alert('The ' + game.title + ' game is in construction')
      }
    } catch(error) {
      alert("Erreur au lancement du jeu")
    }
  }
  
  return ( 
    <Grid style={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.background.default }}>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
            <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={item.title}
                actionIcon={
                  <GamePopup 
                    game={item} 
                    open={selectedGame === item} 
                    onOpen={() => handleOpenPopup(item)}
                    onClose={handleClosePopup} 
                    onLaunch={() => launchGame(item)}
                  />
                }
            />
            </ImageListItem>
          ))}
        </ImageList>
    </Grid>
    
  );
}

const itemData = [
  {
    img: jeu_snake_vignette,
    title: 'Snake Game'
  },
  {
    img: tic_tac_toe_vignette,
    title: 'Tic Tac Toe'
  },
  {
    img: puissance4_vignette,
    title: 'Puissance 4'
  },
  {
    img: memory_vignette,
    title: 'Memory'
  },
  {
    img: pac_man_vignette,
    title: 'Pac Man'
  },
  {
    img: quiz_vignette,
    title: 'Quiz'
  },
  {
    img: arcade_vignette,
    title: 'Arcade'
  },
  {
    img: arcade2_vignette,
    title: 'Arcade2'
  }
];