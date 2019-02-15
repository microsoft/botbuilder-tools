const assert = require('assert');
const ServiceVersion = require('../bin/msbot-clone-service-version').ServiceVersion;

describe("ServiceVersion", () => {

    it("parses version strings", async () => {

        versions = [
            "1.2.3",
            "(1.2.3)",
            "   1.2.3\r",
            "\t1.2.3\t"
        ];

        versions.forEach(version => {

            const actual = new ServiceVersion(version);

            assert.deepEqual(actual.major, 1, `Unexpected major version ${actual.major} parsed from ${version} ${JSON.stringify(actual)}`);
            assert.deepEqual(actual.minor, 2, `Unexpected minor version ${actual.minor} parsed from ${version} ${JSON.stringify(actual)}`);
            assert.deepEqual(actual.patch, 3, `Unexpected patch version ${actual.patch} parsed from ${version} ${JSON.stringify(actual)}`);
        });
    });

    it('is older when version is strictly older', () => {
        const newer = new ServiceVersion("11.22.33");

        const older = ["11.22.00", "11.21.99", "10.999.999"];

        older.forEach(old => {
            const older = new ServiceVersion(old);
            assert.ok(older.isOlder(newer), `${JSON.stringify(older)} *not* older than ${JSON.stringify(newer)}`);
        })
    })

    it('is not older when version is strictly newer', () => {
        const older = new ServiceVersion("11.22.33");

        const newer = ["11.22.99", "11.23.0", "12.0.0"];

        newer.forEach(newVersion => {
            const actual = new ServiceVersion(newVersion);
            assert.ok(!actual.isOlder(older), `${JSON.stringify(actual)} *is* older than ${JSON.stringify(older)}`);
        })
    })

    it('is not older than self', () => {
        const actual = new ServiceVersion("11.22.33");

        assert.ok(!actual.isOlder(actual));
    })
});
