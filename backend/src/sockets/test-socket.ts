import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("Connection Error:", error.message);
});

socket.on("generation.completed", (data) => {
    console.log("Completed:", data);
});

socket.on("generation.failed", (data) => {
    console.log("Failed:", data);
});