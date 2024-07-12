import React, { useState } from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import { Box, Grid, Paper, Switch, Typography, useTheme, Zoom, Card, CardMedia, CardActionArea, CardContent } from "@mui/material";
import StandardImageList from "../components/StandardGamesList";
// import styles from "./css/aboutme.module.css";
// import Image from 'next/image';


const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: '#7e57c2', // (theme) => theme.palette.common.white,
          stroke: '#f3e5f5', // (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

function HomePage() {
  const theme = useTheme();
  const { user } = useState(null);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Grid sx={{ backgroundColor: theme.background.default, minHeight: '100vh' }}>
      <ButtonAppBar />
      <Grid>
        <Typography variant="h4" align="center" sx={{ color: theme.typography.title }}>Bienvenue sur notre plateforme de jeux !</Typography>
        <Typography variant='h5' align='center' sx={{ color: theme.typography.title }}>Explorez et jouez à une variété de jeux passionnants ! </Typography>
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardActionArea href="/game">
            <CardMedia
              component="img"
              height="140"
              image="https://img.freepik.com/photos-premium/mise-au-point-selective-jeu-des-bois-tic-tac_106233-375.jpg?ga=GA1.1.1012433379.1717797129&semt=ais_user"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Morpion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jouez dès maintenant au jeu du morpion en ligne avec vos amis !
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card> */}
        <StandardImageList />
        {/* <Typography>{user ? user.prenom : 'prénom'}</Typography>
            <Typography>{user ? user.pseudo : 'pseudo'}</Typography> */}
      </Grid>
    </Grid>
  );
};

export default HomePage;

// (H1) Bienvenue sur notre plateforme de jeux !
// (H2) Explorez et jouez à une variété de jeux passionnants !

// (normal) Nous sommes ravis de vous accueillir sur notre plateforme de jeux en ligne. Que vous soyez fan de jeux classiques comme le Snake et le Pac-Man, ou que vous préfériez les défis de stratégie comme le Tic Tac Toe et Puissance 4, nous avons quelque chose pour tout le monde.

// (normal) Nos jeux disponibles :
// (normal) Comment jouer :
// Cliquez sur l'icône de votre jeu préféré.
// Une fenêtre popup apparaîtra, vous demandant de confirmer votre choix.
// Cliquez sur "Play" pour lancer le jeu et commencer à vous amuser !
// Nous espérons que vous apprécierez votre temps passé ici. Que le meilleur gagne !

// Amusez-vous bien et bon jeu !

// (dans le footer ) À propos de nous :
// Nous sommes passionnés par les jeux et nous nous efforçons de créer une plateforme où chacun peut trouver quelque chose d'amusant et de stimulant. Notre sélection de jeux est conçue pour offrir des moments de plaisir et de compétition amicale.
