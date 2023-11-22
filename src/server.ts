import express, {Request, Response} from 'express';
import { Pool } from 'pg';
import { isNumeric } from './helpers';
import { PostReqBody, PutReqQuery } from './helpers';

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
    // Enforce that req.body follows the PostReqBody schema in helpers
    try{
        const reqBody = PostReqBody.check(req.body);

        try {
            const query = `
            INSERT INTO students(first_name, last_name, email, enrollment_date) 
            VALUES
            ('${reqBody.first_name}', '${reqBody.last_name}', '${reqBody.email}', '${reqBody.enrollment_date}');
            `
    
            const result = await pool.query(query);
            res.json("Successfully added student!");
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }

    } catch(err){
        console.error(err);
        res.status(400).send("Request body is invalid!");
        return;
    }
});

application.put("/student", async (req: Request, res: Response) => {
    try{
        const reqQuery = PutReqQuery.check(req.query);
        if(!isNumeric(req.query.id)){
            res.status(400).send(`ID needs to be numeric!`);
            return;
        }

        try {
            const idQuery = `
            SELECT *
            FROM Students
            WHERE student_id = ${reqQuery.id}
            LIMIT 1;
            `
            const idRes = await pool.query(idQuery);
            if(idRes.rowCount != 1){
                res.status(400).send(`Could not find a user with this ID`);
                return;
            }

            const query = `
            UPDATE Students
            SET email = '${reqQuery.email}'
            WHERE student_id = ${reqQuery.id}
            ;
            `
    
            const result = await pool.query(query);
            res.json("Updated student email");
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }


    } catch(err){
        console.log(err);
        res.status(400).send("Error in query request...");
    }
})

application.delete("/student/:student_id", async (req: Request, res: Response) => {
    // student_id needs to be numeric
    if(!isNumeric(req.params.student_id)){
        res.status(400).send(`ID needs to be numeric!`);
        return;
    }

    try {
        const query = `
        DELETE FROM students 
        WHERE student_id = ${req.params.student_id};
        `

        const result = await pool.query(query);

        if(result.rowCount > 0){
            res.json(`Successfully deleted student!`);
        } 
        else{
            res.status(400).send(`Could not find student with ID ${req.params.student_id}.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

})

application.listen(PORT, () => {
    console.log("server running...");
})