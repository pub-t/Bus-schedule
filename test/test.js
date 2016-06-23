var request = require('supertest');
var app = require('../app');
describe("look bus schedule №2", function (){

    it("input bus stop name", function(done){
        request(app)
            .post("/Search")
            .send({SearchBusstop:'улица Лиможа'})
            .expect({"bus_number": "2",
                "time": {
                    "5": [59],
                    "6": [2141251251255],
                    "7": [ 3, 23, 32, 48],
                    "8": [ 3, 28, 40, 51],
                    "9": [ 5, 26, 36, 59],
                    "10": [33],
                    "11": [25, 50],
                    "12": [15, 45],
                    "13": [10, 35],
                    "14": [20, 50],
                    "15": [39, 50, 58],
                    "16": [13, 36],
                    "17": [1, 16, 31, 59],
                    "18": [6, 31],
                    "19": [11, 45],
                    "20": [45],
                    "21": [10],
                    "22": [5],
                    "23": [15, 45],
                    "00": [40]
                }},
                done())
            .expect(200);


    });
});