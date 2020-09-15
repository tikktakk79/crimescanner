import m from "mithril";
import file from "./file.js";

function toRadians(x) {
    return x * Math.PI / 180;
}

function distance(position1, position2) {
    var lat1=position1.latitude;

    var lat2=position2.latitude;

    var lon1=position1.longitude;

    var lon2=position2.longitude;

    var R = 6371000; // metres

    var φ1 = toRadians(lat1);

    var φ2 = toRadians(lat2);

    var Δφ = toRadians(lat2-lat1);

    var Δλ = toRadians(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = (R * c)/1000;

    return d;
}



var police = {

    currentCrime: {},

    events: [],

    cachedEvents: [],

    filteredEvents: [],

    getEvents: function () {
        return m.request({
            url: "https://polisen.se/api/events",
        }).then(function(result) {
            //console.log(result);
            police.events = result;
            console.log("police events received");
            var passObj = new Blob(
                [JSON.stringify(police.events)]
                , { type: 'text/plain' });

            file.file(passObj);
            //file.readFile("test.txt");
        });
    },

    filterEvents(eventType) {
        police.filteredEvents = police.events.filter(
            a => a.type.slice(0, eventType.length) === eventType);
        return police.filteredEvents;
    },

    //Returns an array sorted on distance from pos to event
    distEvents(pos, events) {
        let eventsMod = events.map( function(el) {
            console.log(el.location);
            let coords = el.location.gps.split(",");

            el.latitude = coords[0];
            el.longitude = coords[1];
            el.distance = distance(pos, el);
            return el;
        });

        eventsMod.sort((a, b) => (a.distance > b.distance) ? 1 : -1 );
        return eventsMod;
    }
};

export default police;
