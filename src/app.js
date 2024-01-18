import express from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

import cors from "cors";
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//import  routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import supportAgentRouter from "./routes/supportAgent.routes.js";
import supportTicket from "./routes/supportTicket.routes.js";

app.use("/api/healthcheck", healthcheckRouter);
app.use("/api/support-agents", supportAgentRouter);
app.use("/api/support-tickets", supportTicket);

app.get("/", (req, res) => {
  res.json({ message: "Api is properly working" });
});

app.use(errorMiddleware); //Error middleware should be the last middleware
export default app;
