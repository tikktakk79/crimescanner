"use strict";

import m from "mithril";
import police from "../models/police.js";
import county from "../models/county.js";
import auth from "../models/auth.js";

var details = {
    oninit: function() {
        console.log("details onit called");
        county.getCounty();
    },

    view: function () {
        let crime = police.currentCrime;

        console.log(crime.name);

        return m("main.container", [
            m("h3", crime.location.name + " - " + crime.type),
            m("p", crime.name.split(",")[0]),
            m("p", crime.summary),
            m("h3", "Kommundata för  " + county.decidedCountyName + " 2017"),
            (county.koladaResult.hasOwnProperty("N07403")) ? m("p", "Våldsbrott per 100.000 inv: " +
                Math.round(county.koladaResult.N07403)) : null,
            (county.koladaResult.hasOwnProperty("N00905")) ? m("p", "Mediannettoinkomst: " +
                Math.round(county.koladaResult.N00905)) : null,
            (county.koladaResult.hasOwnProperty("U01803")) ? m("p",
                "Inv 18-64 år med låg inkomst: " +
                Math.round(county.koladaResult.U01803)+"%") : null,
            (auth.loggedIn && !police.currentCrime.hasOwnProperty("dataSaved")) ?
                m("button.button", {
                    onclick: function() {
                        auth.saveData();
                        police.currentCrime.dataSaved = true;
                        m.redraw();
                    }
                }, "Spara"): null
        ]);
    }
};

export default details;
