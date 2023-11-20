import express, {Request, Response} from 'express';
import { Pool } from 'pg';

const application = express();

const PORT = 1337;

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASS,
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'A4'
});

application.get("/ping", (request: Request, response: Response) => {
    response.send("Pong");
});

application.get("/students", async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM students'); //TODO: This should be from FS
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

application.post("/student", (req: Request, res: Response) => {
    res.send("Posted student");
})

application.put("/student", (req: Request, res: Response) => {
    res.send("Updated student email");
})

application.delete("/student", (req: Request, res: Response) => {
    res.send("Deleted student");
})

application.listen(PORT, () => {
    console.log("server running...");
})