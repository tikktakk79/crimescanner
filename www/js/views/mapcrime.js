import m from "mithril";

import mapmaker from "../models/mapmaker.js";
import position from "../models/position.js";
import police from "../models/police.js";

var mapCrime = {
    map: {},

    oncreate: function() {
        console.log(position.currentPosition.longitude);
        console.log(police.currentCrime);
        mapmaker.renderMarker(police.currentCrime.longitude, police.currentCrime.latitude,
            police.currentCrime.distance);
    },

    view: function () {
        console.log("current Crime vare här!");
        console.log(police.currentCrime);

        return [
            m("div", [
                m("h3", police.currentCrime.location.name + " - " + police.currentCrime.type),
                m("a", {href: "/details", oncreate: m.route.link}, "Detaljer och statistik"),
                m("div#map.map", "")
            ])
        ];
    }
};

export default mapCrime;
