// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { connectDatabase } from "./db/db.js";
import app from "./app.js";

//config dotenv file
dotenv.config({ path: "./.env" });

connectDatabase(
  process.env.MONGODB_URI ||
    "mongodb+srv://aman:aman@cluster0.suqkggz.mongodb.net/?retryWrites=true&w=majority"
);
const PORT = process.env.PORT || 8000;
console.log("process.env.PORT", process.env.PORT);

console.log(process.env.MONGODB_URI);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
