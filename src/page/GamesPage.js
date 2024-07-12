import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import StandardImageList from "../components/StandardGamesList";
import { Grid, Typography, useTheme } from "@mui/material";

// import styles from "./css/aboutme.module.css";
// import Image from 'next/image';

function GamesPage() {
    const theme = useTheme();
    return (
        <Grid sx={{backgroundColor: theme.background.default, minHeight: '100vh'}}> 
            <ButtonAppBar/>
            <Typography variant="h3" align="center" sx={{color: theme.typography.title}}>Welcome to the Games !</Typography>
            <StandardImageList/>
        </Grid>
    );
};

export default GamesPage;