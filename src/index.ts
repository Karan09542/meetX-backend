import { DB_URL, IS_PRODUCTION, PORT } from "./config/index";
import app from "./app";
import mongoose,{ connect } from "mongoose";

connect(`${DB_URL as string}/meetx`).then(() => console.log(`Connected to DB :  ${mongoose.connection.host}`))

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${IS_PRODUCTION ? "PORT" : "http://localhost:"}${PORT}`);
})