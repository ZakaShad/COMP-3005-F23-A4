import express, {Request, Response} from 'express';

const application = express();

const PORT = 1337;

application.get("/ping", (request: Request, response: Response) => {
    response.send("Pong");
});

application.listen(PORT, () => {
    console.log("server running...");
})