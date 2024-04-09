import { List, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Nav from "../Nav";

const Home = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/connection");

        eventSource.addEventListener("connection", (event) => {
            setMessages([]);
            setId(event.data);
        });
        
        eventSource.addEventListener("message", (event) => {
            setMessages((msgs) => {
                const m = [...msgs];
                m.push(event.data);
                if(m.length > 100) {
                    m.shift();
                }

                return m;
            })
        });

        eventSource.addEventListener("error", (event) =>{
            setMessages((msgs) => {
                const m = [...msgs];
                m.push(JSON.stringify(event, null, 2));
                return m;
            })
        });

        return () => eventSource.close();
    }, []);
    
    
    return (
        <> 
            <Nav/>
            <Typography color="white">ID: {id}</Typography>
            <List sx={{overflow: "auto", maxHeight: "400px"}}>
                {messages.map((msg, i) => (
                    <ListItem key={i}>{msg}</ListItem>
                ))}
            </List>
        </>
    )
};

export default Home;