// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const assert = require('assert');
const fs = require('fs-extra');
const { TestAdapter, TurnContext } = require('botbuilder');
const { LuisRecognizer } = require('botbuilder-ai');
const nock = require('nock');
const luisAppId = "6209a76f-e836-413b-ba92-a5772d1b2087";
const endpointKey = process.env.LUISAPPKEY || "MockedKey";
// If this is false the actual LUIS service will be hit and if there is a difference from
// the expected oracle, there will be a new oracle files that can be compared.
// If this is true the http response comes from the oracle file.
const mockLuis = true;
import 'mocha'
import { Contoso_App } from './Contoso_app';

class TestContext extends (TurnContext as { new(a: any, b: any): any }) {
    constructor(request) {
        super(new TestAdapter(), request);
        this.sent = undefined;
        this.onSendActivities((context, activities, next) => {
            this.sent = activities;
        });
    }
}

function WithinDelta(token1, token2, delta, compare) {
    var within = true;
    if (Array.isArray(token1) && Array.isArray(token2)) {
        within = token1.length == token2.length;
    }
    else if (typeof token1 === "object" && typeof token2 === "object") {
        Object.keys(token2).forEach(k => token2[k] === undefined && delete token2[k]);
        within = Object.keys(token1).length === Object.keys(token2).length;
        Object.keys(token1).forEach(function (key) {
            if (!within) return;
            within = WithinDelta(token1[key], token2[key], delta, compare || key === "score" || key === "intents");
        });
    }
    else if (token1 !== token2) {
        if (token1 !== undefined && token2 != undefined && token1.Type == token2.Type) {
            within = false;
            if (compare &&
                typeof token1 === "number" && typeof token2 === "number") {
                within = Math.abs(token1 - token2) < delta;
            }
        }
        else {
            within = false;
        }
    }
    return within;
}

// To create a file to test:
// 1) Create a <name>.json file with an object { Text:<query> } in it.
// 2) Run this test which will fail and generate a <name>.json.new file.
// 3) Check the .new file and if correct, replace the original .json file with it.
function TestJson(file, done): any {
    var expectedPath = __dirname + "/../src/TestData/" + file;
    var expected = fs.readJSONSync(expectedPath);
    if (mockLuis)
    {
        nock('https://westus.api.cognitive.microsoft.com')
        .post(/apps/)
        .reply(200, expected.luisResult);
    }
    var newPath = expectedPath + ".new";
    var context = new TestContext({ text: expected.text });
    var recognizer = new LuisRecognizer({ applicationId: luisAppId, endpointKey: endpointKey}, {includeAllIntents: true }, true);
    recognizer.recognize(context).then(res => {
        if (!WithinDelta(expected, res, 0.01, false)) {
            fs.outputJSONSync(newPath, res, { spaces: 2 });
            assert(false, "\nReturned JSON\n  " + newPath + "\n!= expected JSON\n  " + expectedPath);
        }
        else if (fs.existsSync(newPath)) {
            fs.unlinkSync(newPath);
        }
        done(res);
    });
}

function CheckApp(app: Contoso_App) {
    assert(app.text);
    assert(!app.alteredText);
    assert(app.intents);
    assert(app.intents.Cancel.score > 0);
    assert(app.intents.Delivery.score > 0);
    assert(app.intents.EntityTests.score > 0);
    assert(app.intents.Greeting.score > 0);
    assert(app.intents.Help.score > 0);
    assert(app.intents.None.score > 0);
    assert(app.intents.search.score > 0);
    assert(app.intents.SpecifyName.score > 0);
    assert(app.intents.Travel.score > 0);
    assert(app.intents.Weather_GetForecast.score > 0);
    assert(app.entities);
}

describe('LUISGen tests', function () {
    if (!mockLuis && endpointKey == "MockedKey") {
        console.warn('WARNING: skipping LuisRecognizer test suite because the LUISAPPKEY environment variable is not defined');
        return;
    }
    it('Match composite1.json', function (done) {
        TestJson("Composite1.json", function (app: Contoso_App) {
            CheckApp(app);

            assert(app.entities.Composite1);
            assert(app.entities.Composite1.length === 1);
            var c = app.entities.Composite1[0];

            assert(c.age.length == 2);
            var age = c.age[0];
            assert(age.number === 12);
            assert(age.units === "Year");

            assert(c.datetime.length === 5);
            var dt = c.datetime[0];
            assert(dt.type === "duration");
            assert(dt.timex.length === 1);
            assert(dt.timex[0] === "P12Y");

            assert(c.dimension.length === 2);
            var dim = c.dimension[0];
            assert(dim.number === 4);
            assert(dim.units === "Acre");

            assert(c.email.length === 1);
            assert(c.email[0] === "chrimc@hotmail.com");

            assert(c.money.length === 2);
            var money = c.money[0];
            assert(money.number === 4);
            assert(money.units === "Dollar");

            assert(c.number.length === 16);
            assert(c.number[0] === 12);

            assert(c.ordinal.length === 2);
            assert(c.ordinal[0] === 3);

            assert(c.percentage.length === 2);
            assert(c.percentage[1] === 10.5);

            assert(c.phonenumber.length === 1);
            assert(c.phonenumber[0] === "425-555-1234");

            assert(c.temperature.length === 2);
            var temp = c.temperature[0];
            assert(temp.number === 3);
            assert(temp.units === "Degree");

            assert(app.entities.$instance.Composite1.length === 1);
            var ic = app.entities.$instance.Composite1[0];
            assert(ic.startIndex === 0);
            assert(ic.endIndex === 262);
            assert(ic.score > 0);
            assert(ic.text);

            assert(c.$instance.age.length === 2);
            var iage = c.$instance.age[0];
            assert(iage.startIndex === 0);
            assert(iage.endIndex === 12);
            assert(!iage.score);
            assert(iage.text === "12 years old");

            assert(c.$instance.datetime.length === 5);
            assert(c.$instance.dimension.length === 2);
            assert(c.$instance.email.length === 1);
            assert(c.$instance.money.length === 2);
            assert(c.$instance.number.length === 16);
            assert(c.$instance.ordinal.length === 2);
            assert(c.$instance.percentage.length === 2);
            assert(c.$instance.phonenumber.length === 1);
            assert(c.$instance.temperature.length === 2);
            done();
        });
    })

    it('Match composite2.json', function (done) {
        TestJson("Composite2.json", function (app: Contoso_App) {
            CheckApp(app);
            assert(app.entities.Composite2);
            assert(app.entities.Composite2.length === 1);
            var c = app.entities.Composite2[0];
            assert(!c.Airline);

            assert(c.url.length === 1);
            assert(c.url[0] === "http://foo.com");

            assert(c.City.length === 1);
            assert(c.City[0] === "denver");

            assert(c.From.length === 1);
            assert(c.From[0] === "seattle");

            assert(c.To.length === 1);
            assert(c.To[0] === "dallas");

            assert(!c.Weather_Location);

            var i = c.$instance;
            assert(!i.Airline);
            assert(i.url.length === 1);
            assert(i.City.length === 1);
            assert(i.From.length === 1);
            assert(i.To.length === 1);
            assert(!i.Airline);
            done();
        });
    });

    it('Match Prebuilt.json', function (done) {
        TestJson("Prebuilt.json", function (app: Contoso_App) {
            CheckApp(app);
            assert(app.entities.Composite2);
            assert(app.entities.Composite2.length === 1);
            var c = app.entities.Composite2[0];
            assert(c.Weather_Location);
            assert(c.Weather_Location.length === 1);
            assert(c.Weather_Location[0] === "seattle");
            assert(c.$instance.Weather_Location.length === 1);
            var iweather = c.$instance.Weather_Location[0];
            assert(iweather.startIndex === 59);
            assert(iweather.endIndex === 66);
            assert(iweather.text === "seattle");
            assert(iweather.score > 0);
            done();
        });
    });

    it('Match Patterns.json', function (done) {
        TestJson("Patterns.json", function (app: Contoso_App) {
            CheckApp(app);
            assert(app.entities.Part);
            assert(app.entities.subject);
            assert(app.entities.person);
            assert(app.entities.extra);
            done();
        });
    });
});

