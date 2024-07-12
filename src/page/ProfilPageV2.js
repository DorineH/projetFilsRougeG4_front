import * as React from "react";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ButtonAppBar from "../components/ButtonAppBar";

// import CountrySelector from "./CountrySelector";
import { Box, Button, Divider, FormControl, FormLabel, Input, Select, Stack, IconButton, Typography, Card, CardActions, Option, Grid, Avatar, Badge, Autocomplete, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useAuth } from "../AuthContext";
import styled from "styled-components";

export default function ProfilPageV2(){
    const theme = useTheme();
    const { user } = useAuth();
    const options = ['France', 'Belgique', 'Allemagne', 'Japon'];

    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px `,
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

    return ( 
        <Grid sx={{backgroundColor: theme.background.default, minHeight: '100vh'}}> 
        <ButtonAppBar/>
        <Stack
            spacing={4}
            sx={{
            display: "flex",
            maxWidth: "1000px",
            mx: "auto",
            px: { xs: 6, md: 6 },
            py: { xs: 2, md: 3 }
            }}
        >
        <Card>
            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Profil</Typography>
            </Box>
            <Divider />
            <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
                <Stack direction="row" spacing={2} sx={{ flex: 1, minWidth: 120 }}>
                    <Grid
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{
                            bgcolor: "background.body",
                            zIndex: 2,
                            borderRadius: "50%",
                            left: 100,
                            top: 170,
                            boxShadow: "sm"
                        }}
                    >
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >

                    <Avatar sx={{ bgcolor: "#8fbc8b", width: 120, height: 120 }}>
                        {user ? user.pseudo[0].toUpperCase() : ''}
                    </Avatar>
                    </StyledBadge>
                    </Grid>
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl
                        >
                            <Input size="sm" placeholder={ user ? user.prenom : 'Prénom :'} />
                        </FormControl>
                    <Stack spacing={1}>
                        <FormLabel>Nom</FormLabel>
                        <FormControl
                            sx={{
                                display: { sm: "flex-column", md: "flex-row" },
                                gap: 2
                            }}
                        > 
                            <Input
                                size="sm"
                                placeholder={ user ? user.nom : 'nom :'}
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                    
                    </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                        <FormLabel>Team</FormLabel>
                        <Input size="sm" defaultValue="LES BUGBUSTERS" />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Pseudo</FormLabel>
                        <Input
                            size="sm"
                            type="email"
                            placeholder={ user ? user.pseudo : 'Pseudo :'}
                            sx={{ flexGrow: 1 }}
                        />
                        </FormControl>
                    </Stack>
                   
                    <div>
                        <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Pays</FormLabel>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            }}
                            options={options}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                           
                        </FormControl>
                    </div>
                    </Stack>
                </Stack>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
                >
                    <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={1}>
                        
                        <IconButton
                        aria-label="upload new picture"
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{
                            bgcolor: "background.body",
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            left: 85,
                            top: 180,
                            boxShadow: "sm"
                        }}
                        >
                        <EditRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                        sx={{
                            display: {
                            sm: "flex-column",
                            md: "flex-row"
                            },
                            gap: 2
                        }}
                        >
                        <Input size="sm" placeholder="First name" />
                        <Input size="sm" placeholder="Last name" />
                        </FormControl>
                    </Stack>
                    </Stack>
                    <FormControl>
                    <FormLabel>Team</FormLabel>
                    <Input size="sm" defaultValue="UI Developer" />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        placeholder="email"
                        defaultValue="siriwatk@test.com"
                        sx={{ flexGrow: 1 }}
                    />
                    </FormControl>                   
                </Stack>
                <Button  size="small" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Enregister les modif
                </Button>
                </Card>
            </Stack>
        </Grid>
        )
}
