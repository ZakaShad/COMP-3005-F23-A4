DROP TABLE if exists Students;
DROP SEQUENCE if exists student_id_seq;

CREATE SEQUENCE student_id_seq;

CREATE TABLE Students (
	student_id Integer DEFAULT nextval('student_id_seq') Primary Key,
	first_name VARCHAR(20) Not Null,
	last_name VARCHAR(20) Not Null,
	email VARCHAR(50) NOT Null UNIQUE,
	enrollment_date Date
);

INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');

SELECT * FROM Students;