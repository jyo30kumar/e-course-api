import mongoose from "mongoose";
import "dotenv/config"

const URI = process.env.DBURI;
const DBNAME = process.env.DBNAME;

const db = async() =>{
    try {
        await mongoose.connect(`${URI}/${DBNAME}`);
    } catch (error) {
        throw new Error(error);
    }
}

export {db};