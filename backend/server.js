import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(8081, () =>{
    console.log("Server running on 8081");
})

