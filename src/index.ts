import "dotenv/config"
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { AppError } from "./utils/AppError.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express(); // it creates an express app instance.
const PORT = process.env.PORT || 5000;

// Middleware

app.use(helmet()); // add security headers in response
app.use(
  cors({
    origin: process.env.CLIENT_URL, // it allows backend to be get accessed by this client url
    credentials: true, // it allows browser to pass credentials for example cookies in cross origin
  })
);

app.use(morgan("dev")); // it logs all the incoming requests in terminal for debugging
app.use(express.json()); // It is a middleware which parse all json data coming from request and serve it in req.body




// Health check endpoint

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timeStamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "yes bro",
  });
});


// Catch-all for unknown routes

app.use((_req, _res, next)=> {
  next(new AppError("Route not found", 404))
})


app.use(errorHandler);

// Start server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
