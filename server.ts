import express,{ Router, request ,Response , response, NextFunction} from "express";
import { router } from "./routes/router";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { ServerResponse } from "http";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
dotenv.config();

async function configure_database(res) {
    try{
        // await db.connect();
        // console.log("`db Connection established`");

        


    }
    catch (err) {
    res.send(err);
  }
}

configure_database(response);

app.use("/Plans",router);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("This is Plan Table API");
});

app.listen(process.env.port, () => {
    console.log('The application is listening '+ 'on port http://localhost:'+ process.env.port);
})