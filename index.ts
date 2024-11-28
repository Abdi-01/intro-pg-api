import express, { Application, Request, Response } from "express";
import cors from "cors";
import dbPool from "./config/db";

const PORT = 2343;

const app: Application = express();
app.use(cors());
app.use(express.json());

// #check DB connection
dbPool.connect((err, client, release) => {
  if (err) {
    return console.log("Error connection to DB :", err.message);
  }
  console.log("Success Connection");
  release();
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("PG API");
});

app.get("/employees", async (req: Request, res: Response) => {
  try {
    const result = await dbPool.query("SELECT * FROM employees;");
    console.log(result.rows);

    res.status(200).send({
      message: "GET Employees",
      success: true,
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
