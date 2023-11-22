import express, {Request, Response} from 'express';
import { Pool } from 'pg';

const application = express();
const bodyParser = require('body-parser');
application.use(bodyParser.json());
const PORT = 1337;

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASS,
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'A4'
});

application.get("/student", async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM students'); //TODO: This should be from FS
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
});

application.post("/student", async(req: Request, res: Response) => {
    
    try {
        const query = `
        INSERT INTO students(first_name, last_name, email, enrollment_date) 
        VALUES
        ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.enrollment_date}');
        `

        const result = await pool.query(query);
        res.json("Successfully added student!");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

application.put("/student", async (req: Request, res: Response) => {
    try {
        const query = `
        UPDATE Students
        SET email = '${req.query.email}'
        WHERE student_id = ${req.query.id}
        ;
        `

        const result = await pool.query(query);
        res.json("Updated student email");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

application.delete("/student/:student_id", async (req: Request, res: Response) => {
    try {
        const query = `
        DELETE FROM students 
        WHERE student_id = ${req.params.student_id};
        `

        const result = await pool.query(query);
        res.json("Successfully deleted student!");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

})

application.listen(PORT, () => {
    console.log("server running...");
})