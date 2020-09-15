"use strict";

import m from "mithril";
import locationIcon from "../../location.png";
import L from "leaflet";
import mapCrime from "../views/mapcrime.js";

var locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});

const position = {
    //keys are latitude and longitude
    currentPosition: {},

    getPosition: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position.geoSuccess,
                position.geoError
            );
        }
    },

    geoSuccess: function(pos) {
        position.currentPosition = pos.coords;
        console.log("position retrieved");
        m.redraw();
    },

    geoError: function(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    },

    showPosition: function () {
        console.log("Running showPosition");
        if (position.currentPosition.latitude && position.currentPosition.longitude) {
            console.log("Have currentPosition");
            var mapContainer = document.getElementById('map');

            if (mapContainer != null) {
                mapContainer._leaflet_id = null;
            }
            L.marker(
                [position.currentPosition.latitude, position.currentPosition.longitude],
                {icon: locationMarker}
            ).addTo(mapCrime.map).bindPopup("Din plats");
        }
    }
};

export default position;
