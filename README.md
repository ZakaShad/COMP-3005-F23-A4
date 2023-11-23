# Video Walkthrough
A video of this server's setup, API, and demo can be found here:
https://youtu.be/obTH3NV1uCQ

# Summary
This is a server that listens to the localhost at port 1337. It provides the following API:

GET /student  -> retrieves all students

POST /student -> uses a request body to add a student to the DB. Req body must have the following schema:

    first_name: String,
    last_name: String, 
    email: String,
    enrollment_date: String
    
PUT /student?id&email -> Find student with `id`, then update the student email to `email`

DELETE /student/:id   -> Delete student with matching `id`

I've gone with a server-based approach in this assignment because that's how I plan to do the final project. 

# Pre-Reqs
You need to have the following tools / packages installed to be able to run this server:
- JS
- Node-JS
- PGAdmin and PostgreSQL

# Preparing the DB
- Launch PGAdmin
- Enter the username and password. **COPY / REMEMBER THESE! YOU WILL NEED THEM!**
- Create a new DB. **REMEMBER THE DB NAME!**
- Run `create.sql` and then `populate.sql` on the scripts

# Preparing the server env
- Run `npm install`
- **IMPORTANT**: Create the following environment variables
    - `DB_PASS`, which should store the password of your DB
    - `DB_USER`, which should store the user of your DB
    - `DB_NAME`, which should store the name of your DB

# Running the server
- Run `npm run dev`
- Now, the server should be listning on port 1337. Use tools like Postman or Thunder Client to easily make the requests.
