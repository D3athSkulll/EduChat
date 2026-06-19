import { getIO } from "../sockets/socket";

export const emitGenerationCompleted = (
    assessmentResultId: string
)=>{
    const io = getIO();

    io.emit("generation.completed",
        {assessmentResultId,}
    );
};

export const emitGenerationFailed = (
    assessmentResultId: string,
    errorMessage: string
)=>{
    const io = getIO();

    io.emit("generation.failed",
        {assessmentResultId,errorMessage}
    );
};