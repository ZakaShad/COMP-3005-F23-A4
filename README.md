# Summary
This is a server that listens to the localhost at port 1337. It provides the following API:

GET /student  -> retrieves all students

POST /student -> uses a request body to add a student to the DB. Req body must have the following schema:
    ```
    first_name: String,
    last_name: String, 
    email: String,
    enrollment_date: String
    ```
PUT /student?id&email -> Find student with `id`, then update the student email to `email`
DELETE /student/:id   -> Delete student with matching `id`

I've gone with a server-based approach in this assignment because that's how I plan to do the final project. 

# Pre-Reqs
You need to have the following tools / packages installed to be able to run this server:
- JS
- Node-JS

# Preparing the DB
Launch PGAdmin
