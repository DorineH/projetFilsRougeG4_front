import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./css/chat.css";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const Chat = () => {
    const [messages, setMessages] = useState([{ id: 0, user: "system", text: "Parlez a votre adversaire !", color: "#000000" }]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [userColors, setUserColors] = useState({});
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on("message", msg => {
            setMessages(prevMessages => {
                if (!prevMessages.some(m => m.id === msg.id)) {
                    return [...prevMessages, msg];
                }
                return prevMessages;
            });
        });

        return () => {
            socket.off("message");
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onChangeMessage = e => {
        setMessage(e.target.value);
    };

    const onChangeUsername = e => {
        setUsername(e.target.value);
    };

    const onSetUsername = () => {
        if (username !== "") {
            setIsUsernameSet(true);
            if (!userColors[username]) {
                setUserColors(prevColors => ({
                    ...prevColors,
                    [username]: getRandomColor()
                }));
            }
        } else {
            alert("Entrer un pseudo pour parler");
        }
    };

    const onClick = () => {
        if (message !== "" && username !== "") {
            const newMessage = { id: Date.now(), user: username, text: message, color: userColors[username] };
            socket.emit("message", newMessage);
            setMessages([...messages, newMessage]);
            setMessage("");
        } else {
            alert("Entrer un message");
        }
    };

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="messages">
                    {messages.length > 0 &&
                        messages.map((msg, index) => (
                            <ul key={msg.id}>
                                <li className="message" style={{ color: msg.color }}>
                                    {msg.user}: {msg.text}
                                </li>
                            </ul>
                        ))}
                    <div ref={messagesEndRef} />
                </div>
                <input
                    value={message}
                    name="message"
                    onChange={e => onChangeMessage(e)}
                    placeholder="Entrer votre message"
                    disabled={!isUsernameSet}
                />
                <button
                    onClick={() => onClick()}
                    disabled={!isUsernameSet}
                >
                    Envoyez
                </button>
            </div>
            {!isUsernameSet && (
                <div className="username-box">
                    <input
                        placeholder="Entrer votre pseudo"
                        value={username}
                        name="username"
                        onChange={e => onChangeUsername(e)}
                    />
                    <button onClick={onSetUsername}>Ajoutez un pseudo pour parler</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
