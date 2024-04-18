import mysql, { Pool, RowDataPacket, FieldPacket } from "mysql2/promise";

export async function POST(req: Request) {
  const pool: Pool = mysql.createPool({
    host: "193.203.184.7",
    user: "u223830212_TenC",
    password: "Cam.pus123$",
    database: "u223830212_Students",
  });

  try {
    var { sCourse } = await req.json();
    //  change scourse to lowercase and remove spaces
    sCourse = sCourse.toLowerCase().replace(/\s/g, "");
    console.log("sCourse", sCourse);

    // Get phone and password from the table name student and then match it with the input
    const connection = await pool.getConnection();

    const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
      await connection.query("SELECT * FROM topics WHERE course = ?", [
        sCourse,
      ]);

    connection.release();

    console.log("topic : ", rows);

    // if (rows.length === 0) {
    //   console.log(" failed");
    //   return new Response("Failed");
    // }

    var result = rows;

    console.log(" successful");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
