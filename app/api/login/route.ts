import mysql, { Pool, RowDataPacket, FieldPacket } from "mysql2/promise";

export async function POST(req: Request) {
  const pool: Pool = mysql.createPool({
    host: "193.203.184.7",
    user: "u223830212_TenC",
    password: "Cam.pus123$",
    database: "u223830212_Students",
  });

  try {
    const { phone, password } = await req.json();

    // Get phone and password from the table name student and then match it with the input
    const connection = await pool.getConnection();

    const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
      await connection.query(
        "SELECT * FROM student WHERE phone = ? AND password = ?",
        [phone, password]
      );

    connection.release();

    console.log("rows : ", rows);

    if (rows.length === 0) {
      console.log("Login failed");
      return new Response("Failed");
    }

    var result = rows[0];

    console.log("Login successfully");

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.log("There was an error in the POST request", e);
  }
}
