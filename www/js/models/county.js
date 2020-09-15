import m from "mithril";

import police from "./police.js";

var kolada = "http://api.kolada.se/v2/";


var county = {

    countyNames: [],

    decidedCountyName: "",

    koladaResult: {},

    countyTitle: "",

    getCounty: function () {
        console.log("running get county");
        let coords = police.currentCrime.location.gps.split(",");

        let latitude = coords[0];

        let longitude = coords[1];

        return m.request({
            url: "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude +
            "&lon=" + longitude + "&zoom=18&addressdetails=3"
        }).then(function(result) {
            return new Promise( function() {
                let fullCounty = result.address.county;

                county.countyNames = [];
                county.countyNames.push(fullCounty.split(" ")[0]);

                console.log(county.countyNames[0]);

                if (county.countyNames[0].slice(-1) === "s") {
                    county.countyNames.unshift(county.countyNames[0].slice(0,
                        county.countyNames[0].length - 1));
                }
                console.log(county.countyNames[0]);
                county.getData();
            });
        });
    },

    getData: function() {
        let testArr = ["bubba", "bengt"];

        console.log(testArr);
        console.log(testArr[0]);
        console.log(county.countyNames);
        console.log(county.countyNames.length);
        return m.request({
            url: kolada +"municipality?title=" + county.countyNames[0],
        }).then(function(result) {
            console.log(result);
            county.decidedCountyName = county.countyNames[0];
            if (result.values < 0) {
                county.decidedCountyName = county.countyNames[1];
                return m.request({
                    url: kolada +"municipality?title=" + county.countyNames[1],
                });
            } else {
                return result;
            }
        }).then(function(result) {
            console.log(result);
            county.countyTitle = result.values[0].title;
            let id = result.values[0].id;

            return m.request({
                url: kolada +"data/kpi/N07403,U01803,N00905/municipality/" + id + "/year/2017"
            }).then(function(result) {
                console.log("Kolada resultat");
                console.log(result);
                result.values.map(function(obj) {
                    county.koladaResult[obj.kpi] = obj.values[obj.values.length - 1].value;
                });
                m.redraw();
            });
        });
    }
};

export default county;
