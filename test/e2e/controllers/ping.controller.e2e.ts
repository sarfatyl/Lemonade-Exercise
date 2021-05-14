import {PingController} from "../../../app/controllers/ping.controller";
import app from "../../../app/app";
const pjson = require('../../../package.json');
import request from "supertest";
import {ApiRoutes} from "../../../app/enums/api-routes.enum";
import {ResponseStatusCodes} from "../../../app/enums/response-status-codes.enum";

describe("PingController", () => {

    describe("getVersion" , () => {

        test("Should return the version of the micro service.", async (done) => {
            const result = await request(app).get(ApiRoutes.Ping + ApiRoutes.GetVersion);
            expect(result.status).toEqual(ResponseStatusCodes.Ok);
            expect(result.text).toEqual(pjson.version);
            done();
        });

    });

});
