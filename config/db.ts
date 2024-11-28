import { Pool } from "pg";

const dbPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "qweasd",
  port: 5433,
});

export default dbPool;
