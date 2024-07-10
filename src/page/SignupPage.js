import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Avatar, Box } from "@mui/material";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Link from '@mui/material/Link';

function SignupPage () {
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

    return(
        <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
            <Box sx={{ marginTop: 8, display: 'flexx', flexDirection: 'column', alignItems: 'center' }}>
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
    );
};

export default SignupPage;