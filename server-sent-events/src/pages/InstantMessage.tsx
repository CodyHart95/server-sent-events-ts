import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Nav from "../Nav";

interface Message {
    direction: "out" | "in",
    text: string;
}

const classes = {
    messageArea: {
        backgroundColor: "white",
        borderRadius: "10px",
        height: "500px",
        width: "700px",
        overflow: "auto"
    },
    outMessageRow: {
        display: "flex",
        justifyContent: "flex-end"
    },
    outMessage: {
        borderRadius: "20px",
        background: "#218aff",
        color: "white",
        padding: "8px",
        maxWidth: "200px",
        overflow: "wrap",
        minWidth: "100px",
        textAlign: "center"
    },
    inMessage: {
        borderRadius: "20px",
        background: "#313136",
        color: "white",
        padding: "8px",
        maxWidth: "200px",
        overflow: "wrap",
        minWidth: "100px",
        textAlign: "center"
    },
    inputArea: {
        marginTop: "16px",
        display: "flex",
        flexDirection: "column",
        width: "800px",
    },
    textField: {
        backgroundColor: "white",
    },
    sendButton: {
        alignSelf: "center",
        width: "200px"
    }
}

const InstantMessage = () => {
    const [id, setId] = useState("");
    const [recipientId, setRecipientId] = useState("");
    const [messageToSend, setMessageToSend] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/message");

        eventSource.addEventListener("connection", (event) => {
            setId(JSON.parse(event.data));
        });
        
        eventSource.addEventListener("message", (event) => {
            setMessages((msgs) => {
                const m = [...msgs];

                const message: Message = {
                    direction: "in",
                    text: JSON.parse(event.data)
                }

                m.push(message);
                if(m.length > 100) {
                    m.shift();
                }

                return m;
            })
        });

        return () => eventSource.close();
    }, []);

    const onSend = async () => {
        const message = messageToSend;
        if(!messageToSend) {
            return;
        }

        setMessages(msgs => {
            const m = [...msgs];
            m.push({
                text: messageToSend,
                direction: "out"
            })

            return m;
        });

        setMessageToSend("");
        return fetch("http://localhost:5000/message", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: message, recipient: recipientId })
        });
    }


    return (
        <Box>
            <Nav/>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-end">
                <Typography>My ID: {id}</Typography>
                <Box sx={classes.messageArea}>
                    <List>
                        {messages.map((msg, i) => (
                            <ListItem key={i} sx={msg.direction === "out" ? classes.outMessageRow : undefined}>
                                <Box sx={msg.direction === "out" ? classes.outMessage : classes.inMessage}>
                                    {msg.text}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={classes.inputArea}>
                    <TextField InputProps={{sx: classes.textField}} sx={{margin: "8px"}}fullWidth label="ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)}/>
                    <TextField InputProps={{sx: classes.textField}} sx={{margin: "8px"}} fullWidth label="Message" multiline value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)}/>
                    <Button variant="contained" sx={classes.sendButton} onClick={onSend}>Send</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default InstantMessage;