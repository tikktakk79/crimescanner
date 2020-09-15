/* global Connection */

"use strict";

import m from "mithril";
import police from "../models/police.js";
import position from "../models/position.js";
import file from "../models/file.js";
import connection from "../models/connection.js";

var procEvents = [];

var crimeTypes = ["Trafikolycka", "Stöld", "Rattfylleri", "Misshandel", "Rån", "Skottlossning", "Mord/dråp, försök"];

var localize = {
    view: function() {
        console.log("LOCALIZE RUNNING");
        return m("div", [

            m("label.input-label", "Brottstyp:"),
            m("select.input", {
                onchange: function (e) {
                    console.log(e.target.value);
                    let fEvents = police.filterEvents(e.target.value);

                    console.log(fEvents);
                    procEvents = police.distEvents(position.currentPosition, fEvents).slice(0, 5);
                    console.log(procEvents);
                }
            },
            m("option", "Välj en brottstyp"),
            crimeTypes.map(function(crime) {
                return m("option", { value: crime }, crime);
            })

            ),
            (police.filteredEvents.length > 0) ? m("div", procEvents.map(function(ev) {
                return m("p", m("a", { href: "/mapcrime", oncreate: m.route.link,
                    onclick: function() {
                        console.log(ev);
                        police.currentCrime = ev;
                        console.log("current crime");
                        console.log(police.currentCrime);
                    }
                }, ev.location.name + " " +
                Math.round(ev.distance) + "km"));
            })): null

        ]);
    }
};


var near = {
    map: {},

    oninit: function() {
        file.independentRead();
        position.getPosition();
        var networkState = navigator.connection.type;

        if (networkState !== Connection.NONE) {
            connection.connected = true;
            police.getEvents();
        } else {
            (police.cachedEvents.length > 0) ? police.events = police.cachedEvents: null;
            connection.connected = false;
        }
    },

    view: function () {
        (police.events.length === 0) ? police.events = police.cachedEvents: null;

        return m("main.container", [
            m("H1", "Brottsplatser nära dig"),
            (!connection.connected) ? (police.cachedEvents.length > 0) ?
                m("p", "OFFLINE - Använder cachade data") : m("p", "OFFLINE - inga cachade data"):
                null,
            (!position.currentPosition.latitude)? m("p", "Din position är ej fastställd"): null,
            (position.currentPosition.latitude && police.events.length > 0) ?
                m("p", localize.view()) :
                (!police.cachedEvents.length > 0)? m("p", "Hämtar brottsdata från polisen." +
                    " Detta kan ta upp till ca 40 sek."):
                    null,
        ]);
    }
};

export default near;
