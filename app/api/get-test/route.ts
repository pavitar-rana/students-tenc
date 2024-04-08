import mysql, { Pool, RowDataPacket, FieldPacket } from "mysql2/promise";

export async function POST(req: Request) {
  const pool: Pool = mysql.createPool({
    host: "193.203.184.7",
    user: "u223830212_TenC",
    password: "Cam.pus123$",
    database: "u223830212_Students",
  });

  try {
    const { id } = await req.json();

    // Get phone and password from the table name student and then match it with the input
    const connection = await pool.getConnection();

    const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
      await connection.query("SELECT * FROM tests WHERE id = ?", [id]);

    connection.release();

    console.log("test : ", rows);

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
