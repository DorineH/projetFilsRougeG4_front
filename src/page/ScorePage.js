import React from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import { Grid, Typography } from "@mui/material";
import { theme } from "../components/css/palette";
import { useTheme } from "@emotion/react";
import UserScores from "../components/UserScores";

function ScorePage() {
    const theme = useTheme();

    return (  
        <Grid sx={{backgroundColor: theme.background.default, minHeight: '100vh'}}> 
            <ButtonAppBar />
            {/* <Typography variant="h3" align="center" sx={{color: theme.typography.title}}>Score</Typography> */}
            <UserScores />
        </Grid>
    );
}

export default ScorePage;