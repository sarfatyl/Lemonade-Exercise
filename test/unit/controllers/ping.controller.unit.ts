import {PingController} from "../../../app/controllers/ping.controller";
import {PingService} from "../../../app/services/ping.service";
import {NextFunction, Request, Response} from "express-serve-static-core";
import Mock = jest.Mock;
import {ResponseStatusCodes} from "../../../app/enums/response-status-codes.enum";

describe("PingController", () => {

    let pingServiceMock: PingService;
    let pingController: PingController;

    beforeEach(() => {
        pingServiceMock = (<Mock<PingService>>PingService) as unknown as PingService;
        pingController = new PingController(pingServiceMock);
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
            pingServiceMock.getVersion = (): string => {return undefined};
            spyOn(pingServiceMock, 'getVersion').and.returnValue('1.0.0');
            spyOn(getVersionParams.res, 'status');
            spyOn(getVersionParams.res, 'send');
            await pingController.getVersion(getVersionParams.req, getVersionParams.res, getVersionParams.next);
            expect(pingServiceMock.getVersion).toBeCalled();
            expect(getVersionParams.res.status).toBeCalledWith(ResponseStatusCodes.Ok);
            expect(getVersionParams.res.send).toBeCalledWith("1.0.0");
            done();
        });

        test("Should pass error.", async (done) => {
            const getVersionParams = {
                req: {} as Request,
                res: {} as Response,
                next: function() {} as NextFunction
            };
            spyOn(getVersionParams, 'next');
            pingServiceMock.getVersion = (): string => {return undefined};
            spyOn(pingServiceMock, 'getVersion').and.throwError("error");
            await pingController.getVersion(getVersionParams.req, getVersionParams.res, getVersionParams.next);
            expect(getVersionParams.next).toBeCalled();
            done();
        });

    });

});
