import { Router, Request, Response } from "express";
const { Analyzer } = require("../controllers/analyzeController");
const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("GET /analyze...");
  res.send("Hi there, wah do you wanna analyze??");
});

router.post("/", Analyzer);

export default router;
