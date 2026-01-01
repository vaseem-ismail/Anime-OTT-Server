import dotenv from "dotenv";

dotenv.config({path: ".env"});

const MONGO_URI = "mongodb+srv://mohamedvaseem:mohamedvaseem@anime-galaxy.7lnts.mongodb.net/";
const JWT_SECRET = "ISMAILVASEEM";

export default {
    MONGO_URI,
    JWT_SECRET,
}