import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("GET /analyze...");
  res.send("Hi there, wah do you wanna analyze??");
});

router.post("/", (req: Request, res: Response) => {
  console.log("POST /analylze");
});

export default router;
