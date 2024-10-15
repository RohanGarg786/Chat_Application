import express from 'express';
import {createServer} from 'http';
import cors from 'cors';
import {Server} from 'socket.io';
import userRouter from './routes/userRoutes';
import cookieParser from 'cookie-parser'

const app = express();

const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    }
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies (credentials) to be sent
}));

app.use(express.json());
app.use(cookieParser());

io.on("connection",(socket)=>{
    console.log("User Connected", socket.id)
});

io.on("disconnect",()=>{
    console.log("Disconnected")
}
);
app.use("/api/v1/user",userRouter);


server.listen(8000,()=>{
    console.log("Server listening on port 8000");
});