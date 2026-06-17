import dotenv from "dotenv";

import app from "./app";
import {connectDB} from "./src/config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
    try{
        await connectDB();

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

