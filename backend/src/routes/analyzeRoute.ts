import { Router, Request, Response } from "express";
const { Analylzer } = require("../controllers/analyzeController");
const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("GET /analyze...");
  res.send("Hi there, wah do you wanna analyze??");
});

router.post("/", Analylzer);

export default router;
