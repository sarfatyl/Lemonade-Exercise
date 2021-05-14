import {PingService} from "../../../app/services/ping.service";
const pjson = require('../../../package.json');

describe("PingService", () => {

    let pingService: PingService;

    beforeEach(() => {
        pingService = new PingService();
    });

    describe("getVersion", () => {

        test("Should return version", () => {
            const version = pingService.getVersion();
            expect(version).toEqual(pjson.version);
        });

    });

});
