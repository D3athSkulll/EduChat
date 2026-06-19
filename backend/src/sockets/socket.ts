import { Server } from "socket.io";

let io: Server;

export const initializeSocket= (server: any)=>{

    console.log(`[Socket] Initializing`);
    io = new Server(server,{
        cors:{
            origin: "*",
        }
    });

    io.on("connection", (socket)=>{
        console.log(`[Socket] Connected ${socket.id}`);
        
        socket.on("disconnect",()=>{
            console.log(`[Socket] Disconnected ${socket.id}`);
        });
    });

    console.log(`[Socket] Initialised`);
    return io;
}

export const getIO = ()=>{
    if(!io){
        throw new Error("Socket.io not initialized");
    }

    return io;
}