require("dotenv").config();
const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const CONNECTION_STRING = `mongodb://${DB_SERVER}:${DB_PORT}`;
const DBNAME = "users";

const COOKIE_PASSWORD = "ALA_MA_KOTA";

module.exports = {
    CONNECTION_STRING,
    DBNAME,
    COOKIE_PASSWORD
}
