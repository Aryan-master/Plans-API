"use strict";
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
exports.addfeatures = exports.deletefeatures = exports.updatepricing = exports.deleteplan = exports.getplans = exports.addplan = void 0;
const query = require("../dbConnect");
const uuid_1 = require("uuid");
const addplan = (plan_id, plan_name, features, price, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        let queryString = "INSERT INTO plan (id, plan_id, plan_name) VALUES ($1, $2, $3)";
        let result = yield query.query(queryString, [
            id,
            plan_id,
            plan_name,
        ]);
        console.log(result);
        if (price != null) {
            id = (0, uuid_1.v4)();
            queryString = "INSERT INTO price (id, plan_id, price) VALUES ($1, $2, $3)";
            yield query.query(queryString, [
                id,
                plan_id,
                price,
            ]);
        }
        if (features.length > 0) {
            for (let i = 0; i < features.length; i++) {
                id = (0, uuid_1.v4)();
                queryString = "INSERT INTO feature (id, plan_id, features) VALUES ($1, $2, $3)";
                yield query.query(queryString, [
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
});
exports.addplan = addplan;
const getplans = (plan_id, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryString = "SELECT plan_name,features,price FROM plan inner join feature ON plan.plan_id=feature.plan_id inner join price ON feature.plan_id=price.plan_id WHERE plan.plan_id=$1";
        let result = yield query.query(queryString, [plan_id]);
        console.log(result);
        res.send(result.rows);
        res.status(200);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});
exports.getplans = getplans;
const deleteplan = (plan_id, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryString = "DELETE * FROM plan inner join feature ON plan.plan_id=feature.plan_id inner join price ON plan.plan_id=price.plan_id WHERE plan.plan_id=$1";
        let result = yield query.query(queryString, [plan_id]);
        console.log(result);
        res.status(200).send('Plan Deletion was successful');
    }
    catch (e) {
        res.send(e);
    }
});
exports.deleteplan = deleteplan;
const updatepricing = (price, plan_id, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryString = "UPDATE price SET price=$1 WHERE plan_id=$2 returning *";
        let result = yield query.query(queryString, [price, plan_id]);
        console.log(result);
        // res.status(200).send('Price Update was successful');
        return result;
    }
    catch (e) {
        res.send(e);
    }
});
exports.updatepricing = updatepricing;
const deletefeatures = (id, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryString = "DELETE FROM feature WHERE id=$1";
        yield query.query(queryString, [id]);
        let result = {
            statusCode: 200,
            message: "Deleted Succesfully",
        };
        res.status(result.statusCode);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
});
exports.deletefeatures = deletefeatures;
const addfeatures = (plan_name, features, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryString = "SELECT plan_id FROM plan WHERE plan_name=$1";
        let result1 = yield query.query(queryString, [plan_name]);
        if (result1.rowCount != 1) {
            let result = {
                statusCode: 404,
                message: "No Such plan exist",
            };
            res.status(result.statusCode);
            res.send(result);
        }
        let plan_id = result1.rows[0]["plan_id"];
        let id = (0, uuid_1.v4)();
        queryString =
            "INSERT INTO feature (id,plan_id, features) VALUES ($1, $2, $3)";
        yield query.query(queryString, [id, plan_id, features]);
        let result = {
            statusCode: 200,
            message: "succesfully inserted feature",
        };
        res.status(result.statusCode);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
});
exports.addfeatures = addfeatures;
