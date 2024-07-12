import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from './backgroundLoginPage.avif';


const defaultTheme = createTheme();

export default function SignInSide() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [prenom, setUserPrenom] = useState('');
    const [nom, setUserNom] = useState('');
    const [pseudo, setUserPseudo] = useState('');
    const [password, setUserPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            console.log(prenom);
            console.log(nom);
            console.log(pseudo);
            console.log(password);
            await signup(prenom, nom, pseudo, password);
            console.log('utilisateur enregistré !')
            // navigate('/home');
        } catch (error) {
            setError("Tous les champs sont obligatoire ");
            console.error("Login failed", error);
            // Gérer les erreurs de connexion ici
        }
    };

    const goToLoginPage = async () => {
        try {
            navigate('/login')
        } catch (error) {
            setError("You can't acced to the signup page");
            console.error("Go to signup page failed", error);
        }
    }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${bgImage})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                {error && <Typography color="error">{error}</Typography>}

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="prenom"
                                label="Prenom"
                                value={prenom}
                                required
                                onChange={(e) => setUserPrenom(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nom"
                                label="nom"
                                value={nom}
                                required
                                onChange={(e) => setUserNom(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="pseudo"
                                label="pseudo"
                                value={pseudo}
                                required
                                onChange={(e) => setUserPseudo(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="password"
                                value={password}
                                type="password"
                                required
                                onChange={(e) => setUserPassword(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3, mb: 2 }}>Signup</Button>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account ? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}