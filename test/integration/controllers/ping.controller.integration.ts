import {PingController} from "../../../app/controllers/ping.controller";
import {PingService} from "../../../app/services/ping.service";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {ResponseStatusCodes} from "../../../app/enums/response-status-codes.enum";
const pjson = require('../../../package.json');

describe("PingController", () => {

    let pingService: PingService;
    let pingController: PingController;

    beforeEach(() => {
        pingService = new PingService();
        pingController = new PingController(pingService);
    });

    describe("getVersion" , () => {

        test("Should return the version of the micro service.", async (done) => {
            const getVersionParams = {
                req: {} as Request,
                res: {
                    status: function () {
                    },
                    send: function () {
                    }
                } as unknown as Response,
                next: function() {} as NextFunction
            };
            spyOn(pingService, 'getVersion').and.callThrough();
            spyOn(getVersionParams.res, 'status');
            spyOn(getVersionParams.res, 'send');
            await pingController.getVersion(getVersionParams.req, getVersionParams.res, getVersionParams.next);
            expect(pingService.getVersion).toBeCalled();
            expect(getVersionParams.res.status).toBeCalledWith(ResponseStatusCodes.Ok);
            expect(getVersionParams.res.send).toBeCalledWith(pjson.version);
            done();
        });

    });

});
