import React, { useEffect, useState } from 'react';
import { useAuth } from "../AuthContext";
import { Grid, Typography } from '@mui/material';

function UserScores() {
    const { user, scoreSnakeGame } = useAuth();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(typeof scores);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                if (user) {
                    const scores = await scoreSnakeGame(user.pseudo);
                    console.log('scores3333333333333', scores);
                    setScores(scores);
                }
            } catch (error) {
                setError("Erreur lors de la récupération des scores", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [user, scoreSnakeGame]);

    return (
        <Grid>
            <Typography variant="h3" align="center">Vos scores</Typography>
            {loading ? (
                <Typography variant="h3" align="center">Chargement ...</Typography>

                ): error ? (
                    <Typography variant="h3" align="center">{error}</Typography>
                ) : scores ? (
                    <ul>
                        {scores.map((score, index) => (
                            <li key={index}>Score: {score.score}</li>
                        ))}
                    </ul>
                ): (
                    <Typography variant="h6" align="center"> Vous n'avez pas encore de scores enregistrés ! </Typography>
            )}
        </Grid>
    );
}

export default UserScores;