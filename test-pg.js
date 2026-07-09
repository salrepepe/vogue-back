require("dotenv").config();

const { Client } = require("pg");

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  console.time("CONNECT");
  await client.connect();
  console.timeEnd("CONNECT");

  console.time("QUERY");
  const result = await client.query(
    'SELECT id, name FROM "Product" LIMIT 20'
  );
  console.timeEnd("QUERY");

  console.log("Rows:", result.rows.length);

  await client.end();
})();