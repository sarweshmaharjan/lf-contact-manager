import mongoose from "mongoose";
import { DB } from "./config";

const connect =() =>{
  mongoose
    .connect(
      `mongodb+srv://${DB.USER}:${DB.PASSWORD}@${DB.API}/${DB.NAME}?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Could not connect to MongoDB"));
}

export default connect;
