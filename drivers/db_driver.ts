const query = require("../dbConnect")
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import { log } from "console";

export const addplan =  async (
    plan_id:number,
    plan_name: string,
    features: Array<string>,
    price:number,
    req: Request,
    res: Response

) => {
    try{
        let id = uuid();
        let queryString= "INSERT INTO plan (id, plan_id, plan_name) VALUES ($1, $2, $3)";
        let result = await query.query(queryString, [
            id,
            plan_id,
            plan_name,
        ]);
        console.log(result);

        if( price !=null){
            id=uuid();
            queryString = "INSERT INTO price (id, plan_id, price) VALUES ($1, $2, $3)";
            await query.query(queryString, [
                id,
                plan_id,
                price,
            ]);
        }

        if(features.length > 0){
            for(let i=0;i<features.length;i++){
                id = uuid();
                queryString= "INSERT INTO feature (id, plan_id, features) VALUES ($1, $2, $3)"
                await query.query(queryString,[
                    id,
                    plan_id,
                    features[i],
                ]);
                console.log(result);
            }
        }

    }
    catch (err) {
    res.send(err);
    }
};

export const getplans = async (
    plan_id: number,
    req:Request,
    res:Response,
    next: NextFunction
    ) => {
    try{
        let queryString = "SELECT plan_name,features,price FROM plan inner join feature ON plan.plan_id=feature.plan_id inner join price ON feature.plan_id=price.plan_id WHERE plan.plan_id=$1";
        let result = await query.query(queryString,[plan_id]);
        console.log(result);
        res.send(result.rows);
        res.status(200);
    }
    catch (err) {
        console.log(err);
    res.send(err);
    }
};

export const deleteplan= async (
    plan_id: number,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        let queryString = "DELETE * FROM plan inner join feature ON plan.plan_id=feature.plan_id inner join price ON plan.plan_id=price.plan_id WHERE plan.plan_id=$1"
        let result = await query.query(queryString, [plan_id]);
        console.log(result);
        res.status(200).send('Plan Deletion was successful');
    } catch (e) {
        res.send(e);
      }
}

export const updatepricing= async(
    price: number,
    plan_id:number,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        let queryString = "UPDATE price SET price=$1 WHERE plan_id=$2 returning *"
        let result = await query.query(queryString, [price,plan_id]);
        console.log(result);
        // res.status(200).send('Price Update was successful');
        return result;
    } catch (e) {
        res.send(e);
      }
}

export const deletefeatures= async(
    id: string,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let queryString = "DELETE FROM feature WHERE id=$1";
      await query.query(queryString, [id]);
      let result = {
        statusCode: 200,
        message: "Deleted Succesfully",
      };
      res.status(result.statusCode);
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  };

export const addfeatures = async(
    plan_name: string,
    features: string,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let queryString = "SELECT plan_id FROM plan WHERE plan_name=$1";
        let result1 = await query.query(queryString, [plan_name]);
        if (result1.rowCount != 1) {
          let result = {
            statusCode: 404,
            message: "No Such plan exist",
          };
          res.status(result.statusCode);
          res.send(result);
        }
        let plan_id = result1.rows[0]["plan_id"];
        let id = uuid();
        queryString =
          "INSERT INTO feature (id,plan_id, features) VALUES ($1, $2, $3)";
        await query.query(queryString, [id, plan_id, features]);
        let result = {
          statusCode: 200,
          message: "succesfully inserted feature",
        };
        res.status(result.statusCode);
        res.send(result);
        
      } catch (e) {
        console.log(e);
        res.send(e);
      }

}