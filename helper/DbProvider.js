// import mysql from "mysql2";

const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "193.203.184.7",
    user: "u223830212_TenC",
    password: "Cam.pus123$",
    database: "u223830212_Students",
  })
  .promise();

// Create the Student table
async function createStudentTable() {
  try {
    const [rows, fields] = await pool.execute("SHOW TABLES LIKE 'users'");
    if (rows.length === 0) {
      await pool.execute(`
          CREATE TABLE student (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Sname VARCHAR(255) NOT NULL,
            gender VARCHAR(255) NOT NULL,
            fatherName VARCHAR(255) NOT NULL,
            fatherContact VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            course VARCHAR(255) NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT false,
            batch VARCHAR(255) NOT NULL,
            totalFees INT,
            paidFees INT,
            remainingFees INT,
            monthlyFees JSON,
            profilePic VARCHAR(255) NOT NULL,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
      console.log("Students table created.");
    } else {
      console.log("Students table already present.");
    }
  } catch (error) {
    console.error("Error creating or checking Students table:", error);
  } finally {
    await pool.end();
  }
}

// Create the Test table

async function createTestTable() {
  try {
    const [rows, fields] = await pool.execute("SHOW TABLES LIKE 'tests'");
    if (rows.length === 0) {
      await pool.execute(`
          CREATE TABLE tests (
            id INT NOT NULL,
            Sname VARCHAR(255) NOT NULL,
            batch VARCHAR(255) NOT NULL,
            course VARCHAR(255) NOT NULL,
            topic VARCHAR(255) NOT NULL,
            totalMarks INT NOT NULL,
            obtainedMarks INT NOT NULL,
            internalMarks INT NOT NULL,
            practicalMarks INT NOT NULL,
            totalMarksP INT NOT NULL,
            totalInternalPM INT NOT NULL,
            date DATE NOT NULL,
            present BOOLEAN NOT NULL DEFAULT false,
            PRIMARY KEY (id, date)
          );
        `);
      console.log("Tests table created.");
    } else {
      console.log("Tests table already present.");
    }
  } catch (error) {
    console.error("Error creating or checking Tests table:", error);
  } finally {
    await pool.end();
  }
}

// Create the Attendance table
// THis should BE a 2 time attendance table first half and second half
async function createAttendanceTable() {
  try {
    const [rows, fields] = await pool.execute("SHOW TABLES LIKE 'attendance'");
    if (rows.length === 0) {
      await pool.execute(`
          CREATE TABLE attendance (
            id INT NOT NULL,
            Sname VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            presentF BOOLEAN NOT NULL DEFAULT false,
            presentS BOOLEAN NOT NULL DEFAULT false,
            onLeave BOOLEAN NOT NULL DEFAULT false,
            inTime VARCHAR(255),
            outTime VARCHAR(255),
            reason VARCHAR(255),
            holiday BOOLEAN NOT NULL DEFAULT false,
            PRIMARY KEY (id, date) 
          );
        `);
      console.log("Attendance table created.");
    } else {
      console.log("Attendance table already present.");
    }
  } catch (error) {
    console.error("Error creating or checking Attendance table:", error);
  } finally {
    await pool.end();
  }
}

// Create Topic covered table
async function createTopicCoveredTable() {
  try {
    const [rows, fields] = await pool.execute("SHOW TABLES LIKE 'topics'");
    if (rows.length === 0) {
      await pool.execute(`
          CREATE TABLE topics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            course VARCHAR(255) NOT NULL,
            topic VARCHAR(255) NOT NULL,
            subtopic VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            content VARCHAR(255) NOT NULL,
            faculty VARCHAR(255) NOT NULL
          );
        `);
      console.log("Topics table created.");
    } else {
      console.log("Topics table already present.");
    }
  } catch (error) {
    console.error("Error creating or checking Topics table:", error);
  } finally {
    await pool.end();
  }
}

// Create Institute table
async function createInstituteTable() {
  try {
    const [rows, fields] = await pool.execute("SHOW TABLES LIKE 'institute'");
    if (rows.length === 0) {
      await pool.execute(`
          CREATE TABLE institute (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fieldName VARCHAR(255) NOT NULL,
            fieldValue VARCHAR(255) NOT NULL,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            course JSON
            batch JSON
          );
        `);
      console.log("Institute table created.");
    } else {
      console.log("Institute table already present.");
    }
  } catch (error) {
    console.error("Error creating or checking Institute table:", error);
  } finally {
    await pool.end();
  }
}

createStudentTable();
// createTestTable();
// createAttendanceTable();
// createTopicCoveredTable();
// createInstituteTable();
// Write a function to delete student table

async function deleteStudentTable() {
  try {
    // await pool.execute("DROP TABLE student");
    // drop all tables above
    // await pool.execute("DROP TABLE tests");
    // await pool.execute("DROP TABLE attendance");
    // await pool.execute("DROP TABLE topics");
    // await pool.execute("DROP TABLE institute");

    console.log("Students table deleted.");
  } catch (error) {
    console.error("Error deleting Students table:", error);
  } finally {
    await pool.end();
  }
}

// deleteStudentTable();
