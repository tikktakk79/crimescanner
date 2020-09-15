"use strict";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import position from "./position.js";
import mapcrime from "../views/mapcrime.js";

var mapMaker = {

    showMap: function(dist) {
        var zoom = 6;

        if (dist < 2) {
            zoom = 13;
        } else if (dist < 5) {
            zoom = 12;
        } else if (dist < 8) {
            zoom = 11;
        } else if (dist < 14) {
            zoom = 10;
        } else if (dist < 30) {
            zoom = 9;
        } else if (dist < 70) {
            zoom = 8;
        } else if (dist < 120) {
            zoom = 7;
        } else if (dist < 250) {
            zoom = 6;
        } else if (dist < 500) {
            zoom = 5;
        } else  if (dist < 1500) {
            zoom = 4;
        } else {
            zoom = 3;
        }

        var mapContainer = document.getElementById('map');

        if (mapContainer != null) {
            mapContainer._leaflet_id = null;
        }

        mapcrime.map = L.map("map").setView([position.currentPosition.latitude,
            position.currentPosition.longitude], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
            attribution: `&copy;
            <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors`
        }).addTo(mapcrime.map);
    },

    renderMarker: function(x, y, dist) {
        mapMaker.showMap(dist);
        L.marker([y, x]).addTo(mapcrime.map);
        position.showPosition();
    }
};

export default mapMaker;
