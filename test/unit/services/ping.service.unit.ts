import {PingService} from "../../../app/services/ping.service";
const pjson = require('../../../package.json');

describe("PingService", () => {

    let pingService: PingService;

    beforeEach(() => {
        pingService = new PingService();
    });

    describe("getVersion", () => {

        test("Should return version", () => {
            const mockVersion = "1.2.3";
            pjson.version = "1.2.3";
            const version = pingService.getVersion();
            expect(version).toEqual(mockVersion);
        });

    });

});
