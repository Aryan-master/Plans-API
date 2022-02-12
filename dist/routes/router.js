"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const validation_1 = require("../validation");
const Joi = __importStar(require("joi"));
const db_driver_1 = require("../drivers/db_driver");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/addplan", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside addplan");
    try {
        let plan_id = req.body.plan_id;
        let plan_name = req.body.plan_name;
        let features = req.body.features || [];
        let price = req.body.price || null;
        try {
            const result = yield validation_1.add_plans_schema.validateAsync(req.body);
        }
        catch (err) {
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the data");
        const a = yield (0, db_driver_1.addplan)(plan_id, plan_name, features, price, req, res);
        console.log("sending user response");
        const obj = {
            statusCode: 200,
            message: "Successfull",
            body: a,
        };
        res.send(obj);
    }
    catch (err) {
        res.send(err);
    }
}));
router.get("/getplans", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside getplans");
    try {
        let plan_id = req.query.plan_id;
        try {
            const result = yield Joi.number().required().validateAsync(req.query.plan_id);
        }
        catch (err) {
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the Search Data");
        yield (0, db_driver_1.getplans)(plan_id, req, res, next);
        res.status(200);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}));
router.delete("/deleteplan", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside deleteplan router");
    try {
        let plan_id = req.query.plan_id;
        try {
            const result = yield Joi.number().required().validateAsync(req.query.plan_id);
        }
        catch (err) {
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the deletion data");
        yield (0, db_driver_1.deleteplan)(plan_id, req, res, next);
        res.status(200);
    }
    catch (err) {
        res.send(err);
    }
}));
router.put("/updatepricing", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside updatepricing router");
    try {
        let price = req.body.price;
        let plan_id = req.body.plan_id;
        try {
            // await Joi.number()(req.body.price);
            // await Joi.number().required().validateAsync(req.body.plan_id);
        }
        catch (err) {
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the sent data");
        const abc = yield (0, db_driver_1.updatepricing)(price, plan_id, req, res, next);
        const result = {
            statusCode: 200,
            message: "Succesfully updated pricing",
            data: abc.rows
        };
        // res.status(result.statusCode);
        res.send(result);
    }
    catch (err) {
        res.send(err);
    }
}));
router.delete("/deletefeatures", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside deletefeatures router");
    try {
        let id = req.query.id;
        try {
            const result = yield Joi.string().guid().required().validateAsync(req.query.id);
        }
        catch (err) {
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the feature data");
        yield (0, db_driver_1.deletefeatures)(id, req, res, next);
    }
    catch (err) {
        res.send(err);
    }
}));
router.post("/addfeatures", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside addfeature router");
    try {
        let plan_name = req.body.plan_name;
        let features = req.body.features;
        try {
            yield Joi.string().required().validateAsync(req.body.plan_name);
            yield Joi.string().required().validateAsync(req.body.features);
        }
        catch (err) {
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message,
            };
            res.status(obj.statusCode);
            res.send(obj);
        }
        console.log("Validated the feature data");
        yield (0, db_driver_1.addfeatures)(plan_name, features, req, res, next);
    }
    catch (e) {
        res.send(e);
    }
}));
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
