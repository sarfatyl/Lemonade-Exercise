import app from "../../../app/app";
import request from "supertest";
import {ApiRoutes} from "../../../app/enums/api-routes.enum";
import {ResponseStatusCodes} from "../../../app/enums/response-status-codes.enum";

describe("WordController", () => {

    describe("getStatistics" , () => {

        test("Should return the the number of linoy occurrence.", async (done) => {
            const result = await request(app).get(ApiRoutes.Word + ApiRoutes.Statistics).query({word: 'linoy'});
            expect(result.status).toEqual(ResponseStatusCodes.Ok);
            expect(result.text).toContain('3');
            done();
        });

    });

});
