import React, { useState } from "react";
import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, useTheme, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";


function LoginPage () {
    // const theme = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [pseudo, setUserPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            console.log(pseudo);
            console.log(password);
            await login(pseudo, password);
        } catch (error) {
            setError("User name or password is incorrect");
            console.error("Login failed", error);
            // Gérer les erreurs de connexion ici
        }
    };

    const goToSignupPage = async () => {
        try {
            navigate('/signup')
        } catch (error) {
            setError("You can't acced to the signup page");
            console.error("Go to signup page failed", error);
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        // <ImageBackground  className="background">
        <Grid container alignItems="center" style={{ height: '100vh' }}>
            <Grid 
                item 
                xs={false} 
                sm={4}
                md={7}
                sx={{
                    // backgroundImage:
                    // 'url("projetFilsRougeG4_front/src/assets/images/backgroundLoginPage.avif")',
                    backgroundColor: 'red',
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> Sign in </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="pseudo"
                    label="Pseudo"
                    name="pseudo"
                    autoComplete="pseudo"
                    autoFocus
                    onChange={(e) => setUserPseudo(e.target.value)}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl> 
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                    Sign In
                </Button>
                <Button variant="contained" onClick={goToSignupPage}>
                    Signup
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
                </Box>
            </Box>
            </Grid>                       
        </Grid>
        // </ImageBackground>
    );
};

export default LoginPage;