import dotenv from "dotenv";

import app from "./app";
import {connectDB} from "./src/config/db";
import {connectRabbitMQ} from "./src/config/rabbitmq";
import {startGenerationConsumer} from "./src/workers/generation.consumer";
dotenv.config();

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
    try{
        await connectDB();
        await connectRabbitMQ();

        await startGenerationConsumer();

        app.listen(PORT, ()=>{
            console.log(`Server Running on port ${PORT}`);
        });
    } catch(error){
        console.error("Failed to start application");
        console.error(error);
        process.exit(1);
    }
};

bootstrap();

