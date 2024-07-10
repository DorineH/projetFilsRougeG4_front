import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import socketService from "../services/socketService";
import { JoinRoom } from "../components/joinRoom";
import GameContext, { IGameContextProps } from "../gameContext";
import { Game } from "../components/game";

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 2;
  margin-bottom: 2em;
  color: ##36494E;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function GameComponent() {
    const [isInRoom, setInRoom] = useState(false);
    const [playerSymbol, setPlayerSymbol] = useState("x");
    const [isPlayerTurn, setPlayerTurn] = useState(false);
    const [isGameStarted, setGameStarted] = useState(false);

    const connectSocket = async () => {
        const socket = await socketService
            .connect("http://localhost:9000")
            .catch((err) => {
                console.log("Error: ", err);
            });
    };

    useEffect(() => {
        connectSocket();
    }, []);

    const gameContextValue = {
        isInRoom,
        setInRoom,
        playerSymbol,
        setPlayerSymbol,
        isPlayerTurn,
        setPlayerTurn,
        isGameStarted,
        setGameStarted,
    };

    return (
        <GameContext.Provider value={gameContextValue}>
            <GameContainer>
                <WelcomeText>A vous de jouez !</WelcomeText>
                <MainContainer>
                    {!isInRoom && <JoinRoom />}
                    {isInRoom && <Game />}
                </MainContainer>
            </GameContainer>
        </GameContext.Provider>
    );
}

export default GameComponent;
