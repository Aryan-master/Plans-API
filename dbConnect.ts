import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

 const client = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: parseInt(<string>process.env.pg_port),
});


 client.connect();


client.query('SELECT NOW()', (err, res) => {
    const {rows} = res
    console.log("`db Connection established at ===============",rows);
    
    
})



module.exports = {
    query: (text, params) => client.query(text, params),
  }