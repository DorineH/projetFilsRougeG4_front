import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import { Avatar, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import { useAuth } from "../AuthContext";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));


function ProfilPage() {

    const theme = useTheme();
    const { user } = useAuth();
    console.log(user);

    return (
        <Grid sx={{backgroundColor: theme.background.default, minHeight: '100vh'}}> 
            <ButtonAppBar/>
            <Typography variant="h3" align="center" sx={{color: theme.typography.title}}>Your profil !</Typography>
        
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: theme.palette.profil
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                    <Stack direction="row" spacing={2}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >


                        <Avatar 
                            sx={{ bgcolor: "#d1c4e9", width: 120, height: 120 }}
                        >
                            {user ? user.pseudo[0].toUpperCase() : ''}
                        </Avatar>
                        </StyledBadge>
                    </Stack>
                        <Typography align="center" >{ user ? user.pseudo : 'Pseudo :'}</Typography>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="h6">Prénom</Typography>
                            <Typography variant="h6">Pseudo</Typography>
                            <Typography variant="h6">Nom</Typography>
                            <Typography variant="h6">Pays</Typography>
                            <Typography variant="h6">Team</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <TextField 
                                label={ user ? user.prenom : 'PrÃ©nom :'}
                                id="outlined-size-small"
                                size="small"
                            >
                            </TextField>
                            <Typography>{ user ? user.pseudo : 'Pseudo :'}</Typography>
                            <Typography>{ user ? user.nom : 'Nom :'}</Typography>
                            <Typography></Typography>
                            <Typography></Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    
    );
};

export default ProfilPage;