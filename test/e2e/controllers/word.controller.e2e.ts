import app from "../../../app/app";
import request from "supertest";
import {ApiRoutes} from "../../../app/enums/api-routes.enum";
import {ResponseStatusCodes} from "../../../app/enums/response-status-codes.enum";

describe("WordController", () => {

    describe("getStatistics" , () => {

        test("Should return the version of the micro service.", async (done) => {
            const result = await request(app).get(ApiRoutes.Word + ApiRoutes.Statistics);
            expect(result.status).toEqual(ResponseStatusCodes.Ok);
            // expect(result.text).toEqual(pjson.version);
            done();
        });

    });

});
