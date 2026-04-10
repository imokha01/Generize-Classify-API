import express from "express";
import useRoute from "./routes/route.js"
import cors from "cors"

const app = express();
const port = 3000;

//! Setup Middleware

app.use(express.json());

app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type"]
}));


//TODO: Setup Route

app.use("/api", useRoute)


//BUG Route Error Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found"
  })
})



app.listen(port, ()=>{
  console.log(`server running at http://localhost:${port}/`)
})