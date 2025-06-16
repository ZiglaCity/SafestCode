import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/health", (req: Request, res: Response) => {
  res.send("Backend up!");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to the SafestCode!!!");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
