import { Router } from "express";
import { add_plans_schema } from "../validation";
import * as Joi from "joi";
import { NextFunction, Request, Response } from "express";
import {
    addfeatures,
    addplan,
    deletefeatures,
    deleteplan,
    getplans,
    updatepricing,
} from "../drivers/db_driver";

const router = Router();

router.post("/addplan",
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("Inside addplan");
        try {
            let plan_id = req.body.plan_id;
            let plan_name = req.body.plan_name;
            let features = req.body.features || [];
            let price = req.body.price || null;
            try {
                const result = await add_plans_schema.validateAsync(req.body);
            } catch (err: any) {
                console.log(err);
                const obj = {
                    statusCode: 400,
                    message: err.message,
                };
                res.status(obj.statusCode);
                res.send(obj);
            }
            console.log("Validated the data");
            const a = await addplan(
                plan_id,
                plan_name,
                features,
                price,
                req,
                res
            );
            console.log("sending user response");
            const obj = {
                statusCode: 200,
                message: "Successfull",
                body: a,
            };
            res.send(obj);
        } catch (err) {
            res.send(err);
        }
    }
);

router.get("/getplans",
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("Inside getplans");
    try {
         let plan_id: number= req.query.plan_id as number;
        try{
            const result = await Joi.number().required().validateAsync(req.query.plan_id);
        }
        catch(err:any){
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the Search Data");
        await getplans(plan_id, req, res, next);
        res.status(200);
    }catch (err) {
        console.log(err);
        res.send(err);
    }
  }
);

router.delete("/deleteplan",
async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside deleteplan router");
    try {
      let plan_id = req.query.plan_id as number;
      try {
        const result = await Joi.number().required().validateAsync(req.query.plan_id);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the deletion data");
      await deleteplan(plan_id, req, res, next);
      res.status(200);
    } catch (err) {
      res.send(err);
    }
  }
);

router.put(
    "/updatepricing",
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("Inside updatepricing router");
        try {
          let price = req.body.price;
          let plan_id = req.body.plan_id;
          try {
            // await Joi.number()(req.body.price);
            // await Joi.number().required().validateAsync(req.body.plan_id);
          } catch (err: any) {
            console.log(err);
            const obj = {
              statusCode: 400,
              message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
          }
          console.log("Validated the sent data");
          const abc=await updatepricing(
            price,
            plan_id,
            req,
            res,
            next
          );
          const result = {
            statusCode: 200,
            message: "Succesfully updated pricing",
            data: abc.rows
          };
          // res.status(result.statusCode);
          res.send(result);
        } catch (err) {
          res.send(err);
        }
      }
);

router.delete("/deletefeatures", async (req: Request, res: Response, next: NextFunction) =>{
    console.log("Inside deletefeatures router");
    try {
      let id = req.query.id as string;
      try {
        const result = await Joi.string().guid().required().validateAsync(req.query.id);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the feature data");
      await deletefeatures(id, req, res, next);
    } catch (err) {
      res.send(err);
    }
}
);

router.post("/addfeatures",async (req: Request, res: Response, next: NextFunction) =>{
    console.log("Inside addfeature router");
    try{
        let plan_name = req.body.plan_name;
        let features = req.body.features;
        try{
            await Joi.string().required().validateAsync(req.body.plan_name);
            await Joi.string().required().validateAsync(req.body.features);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the feature data");
      await addfeatures(plan_name, features, req, res, next);
    } catch (e) {
      res.send(e);
        }
    }
);

export{ router };



// const ListUserAuthorizationsJoiSchema = Joi.object({
//   key       : Joi.string().optional(),
//   role_id   : Joi.string().guid({ version: 'uuidv4' }).optional(),
//   opco_id   : Joi.string().guid({ version: 'uuidv4' }).optional(),
//   is_enabled: Joi.boolean().optional()
// })
// -----------------------------------------------------------------------
// public joiValidationUtil(joiSchema: any, requestData: any) {
//        try {
//            const options = {
//                allowUnknown: true,
//            };
//            const { error } = joiSchema.validate(requestData, options);
//            if (error) {
//                throw new Error(error.details[0].message.replace(/["]/gi, ""))
//            }
//        } catch (error: any) {
//            console.log("======== error in jooi util function", error);
//            throw error;
//        }
//    }
// ----------------------------------------------------------------------------------------
//      this.joiValidationUtil(CreateUserAuthJoiSchema, this.requestData);