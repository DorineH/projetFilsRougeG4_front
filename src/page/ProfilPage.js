import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import { Avatar, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import { useAuth } from "../AuthContext";

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
                test
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar 
                            sx={{ bgcolor: "#d1c4e9", width: 120, height: 120 }}
                        >
                            {user ? user.pseudo[0].toUpperCase() : ''}
                        </Avatar>
                        <Typography>Pseudo</Typography>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography>{ user ? user.prenom : 'Prénom :'}</Typography>
                            <Typography>{ user ? user.pseudo : 'Pseudo :'}</Typography>
                            <Typography>Nom</Typography>
                            <Typography>Pays</Typography>
                            <Typography>Team</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    
    );
};

export default ProfilPage;