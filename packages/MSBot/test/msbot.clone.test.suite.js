const assert = require('assert');
const ServiceVersion = require('../bin/msbot-clone-service-version').ServiceVersion;

describe("ServiceVersion", () => {

    it("parses version strings", async () => {

        versions = [{
                text: "1",
                major: 1,
                minor: 0,
                patch: 0,
                rev: 0
            }, {
                text: "1.2",
                major: 1,
                minor: 2,
                patch: 0,
                rev: 0
            }, {
                text: "1.2.3",
                major: 1,
                minor: 2,
                patch: 3,
                rev: 0
            },
            {
                text: "(1.2.3)",
                major: 1,
                minor: 2,
                patch: 3,
                rev: 0
            },
            {
                text: "   1.2.3\r",
                major: 1,
                minor: 2,
                patch: 3,
                rev: 0
            },
            {
                text: "\t1.2.3\t",
                major: 1,
                minor: 2,
                patch: 3,
                rev: 0
            },
            {
                text: "1.2.3.4",
                major: 1,
                minor: 2,
                patch: 3,
                rev: 4
            }
        ];

        versions.forEach(item => {

            const actual = new ServiceVersion(item.text);

            assert.deepEqual(actual.major, item.major, `Unexpected major ${actual.major} parsed from ${item} ${JSON.stringify(actual)}`);
            assert.deepEqual(actual.minor, item.minor, `Unexpected minor ${actual.minor} parsed from ${item} ${JSON.stringify(actual)}`);
            assert.deepEqual(actual.patch, item.patch, `Unexpected patch ${actual.patch} parsed from ${item} ${JSON.stringify(actual)}`);
            assert.deepEqual(actual.revision, item.rev, `Unexpected revision  ${actual.revision} parsed from ${item} ${JSON.stringify(actual)}`);
        });
    });

    it('is older when version is strictly older', () => {
        const newer = new ServiceVersion("11.22.33.44");

        const older = ["10", "11.00", "11.22.00", "11.21.99", "10.999.999", "11.22.33.00", "10.99.99.99"];

        older.forEach(old => {
            const cases = new ServiceVersion(old);
            assert.ok(cases.isOlder(newer), `${JSON.stringify(cases)} *not* older than ${JSON.stringify(newer)}`);
        })
    })

    it('is not older when version is strictly newer', () => {
        const older = new ServiceVersion("11.22.33");

        const cases = ["12", "11.23", "11.22.99", "11.23.0", "12.0.0", "11.22.33.99", "11.23.0.0", "12.0.0.0"];

        cases.forEach(newVersion => {
            const actual = new ServiceVersion(newVersion);
            assert.ok(!actual.isOlder(older), `${JSON.stringify(actual)} *is* older than ${JSON.stringify(older)}`);
        })
    })

    it('is not older than self', () => {
        const cases = ["11", "11.22", "11.22.33", "11.22.33.44"]
        cases.forEach(version => {
            const actual = new ServiceVersion(version);
            assert.ok(!actual.isOlder(actual));
        });
    })
});
