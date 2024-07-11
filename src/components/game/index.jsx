import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import gameContext from "../../gameContext.js";
import gameService from "../../services/gameService/index.js";
import socketService from "../../services/socketService/index.js";
import Chat from "../ChatComponent.js";
import { Box, Container } from "@mui/material";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Zen Tokyo Zoo", cursive;
  position: relative;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Cell = styled.div`
  width: 13em;
  height: 9em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  border-top: ${({ borderTop }) => borderTop && "3px solid "};
  border-left: ${({ borderLeft }) => borderLeft && "3px solid "};
  border-bottom: ${({ borderBottom }) => borderBottom && "3px solid "};
  border-right: ${({ borderRight }) => borderRight && "3px solid "};
  transition: all 270ms ease-in-out;

  &:hover {
    background-color: #DCDFDA;
  }
`;

const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

const X = styled.span`
  font-size: 100px;
  color: #9AC8EB;
  &::after {
    content: "X";
  }
`;

const O = styled.span`
  font-size: 100px;
  color: #FE4B4B;
  &::after {
    content: "O";
  }
`;

export function Game() {
    const [matrix, setMatrix] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const {
        playerSymbol,
        setPlayerSymbol,
        setPlayerTurn,
        isPlayerTurn,
        setGameStarted,
        isGameStarted,
    } = useContext(gameContext);

    const checkGameState = (matrix) => {
        for (let i = 0; i < matrix.length; i++) {
            let row = [];
            for (let j = 0; j < matrix[i].length; j++) {
                row.push(matrix[i][j]);
            }

            if (row.every((value) => value && value === playerSymbol)) {
                return [true, false];
            } else if (row.every((value) => value && value !== playerSymbol)) {
                return [false, true];
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            let column = [];
            for (let j = 0; j < matrix[i].length; j++) {
                column.push(matrix[j][i]);
            }

            if (column.every((value) => value && value === playerSymbol)) {
                return [true, false];
            } else if (column.every((value) => value && value !== playerSymbol)) {
                return [false, true];
            }
        }

        if (matrix[1][1]) {
            if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
                if (matrix[1][1] === playerSymbol) return [true, false];
                else return [false, true];
            }

            if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
                if (matrix[1][1] === playerSymbol) return [true, false];
                else return [false, true];
            }
        }

        // Check for a tie
        if (matrix.every((m) => m.every((v) => v !== null))) {
            return [true, true];
        }

        return [false, false];
    };

    const updateGameMatrix = (column, row, symbol) => {
        const newMatrix = [...matrix];

        if (newMatrix[row][column] === null || newMatrix[row][column] === "null") {
            newMatrix[row][column] = symbol;
            setMatrix(newMatrix);
        }

        if (socketService.socket) {
            gameService.updateGame(socketService.socket, newMatrix);
            const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);
            if (currentPlayerWon && otherPlayerWon) {
                gameService.gameWin(socketService.socket, "The Game is a TIE!");
                alert("La partie fini par une ÉGALITÉ!");
                window.location.href = "/game";
            } else if (currentPlayerWon && !otherPlayerWon) {
                gameService.gameWin(socketService.socket, "You Lost!");
                alert("Tu as gagné!");
                window.location.href = "/game";
            } else if (!currentPlayerWon && otherPlayerWon) {
                alert("Tu as perdu!");
                window.location.href = "/game";
            }

            setPlayerTurn(false);
        }
    };

    const handleGameUpdate = () => {
        if (socketService.socket)
            gameService.onGameUpdate(socketService.socket, (newMatrix) => {
                setMatrix(newMatrix);
                checkGameState(newMatrix);
                setPlayerTurn(true);
            });
    };

    const handleGameStart = () => {
        if (socketService.socket) {
            console.log("Game Started: Socket connected");
            gameService.onStartGame(socketService.socket, (options) => {
                console.log("Game Started with options:", options);
                setGameStarted(true); // Schedule state update
                setPlayerSymbol(options.symbol);
                if (options.start) setPlayerTurn(true);
                else setPlayerTurn(false)
            });
        } else {
            console.log("Socket not connected");
        }
    };

    const handleGameWin = () => {
        if (socketService.socket)
            gameService.onGameWin(socketService.socket, (message) => {
                console.log("Game Win:", message);
                setPlayerTurn(false);
                alert(message);
            });
    };

    useEffect(() => {
        handleGameUpdate();
        handleGameStart();
        handleGameWin();
    }, []);

    useEffect(() => {
        console.log("Game started state changed:", isGameStarted);
    }, [isGameStarted]);

    return (
        <Container maxWidth="xl">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                <GameContainer>
                    {!isGameStarted && (
                        <h2>En attente qu'un autre joueur se joigne pour démarrer le jeu !</h2>
                    )}
                    {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
                    {matrix.map((row, rowIdx) => {
                        return (
                            <RowContainer key={rowIdx}>
                                {row.map((column, columnIdx) => (
                                    <Cell
                                        key={columnIdx}
                                        borderRight={columnIdx < 2}
                                        borderLeft={columnIdx > 0}
                                        borderBottom={rowIdx < 2}
                                        borderTop={rowIdx > 0}
                                        onClick={() =>
                                            updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                                        }
                                    >
                                        {column && column !== "null" ? (
                                            column === "x" ? (
                                                <X />
                                            ) : (
                                                <O />
                                            )
                                        ) : null}
                                    </Cell>
                                ))}
                            </RowContainer>
                        );
                    })}
                </GameContainer>
                <Chat />
            </Box>
        </Container>
    );
}