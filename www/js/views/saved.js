"use strict";

import m from "mithril";
import auth from "../models/auth.js";
import police from "../models/police.js";

var saved = {
    oninit: function() {
        auth.getData();
    },

    view: function () {
        auth.storedData.map(function(el) {
            (el.hasOwnProperty("artefact")) ? console.log(JSON.parse(el.artefact)): null;
        });
        console.log(auth.storedData);
        let data = auth.storedData.slice(-5).reverse();

        return m("main.container", [
            (data.length > 0) ? data.map(function(el) {
                let info = JSON.parse(el.artefact);

                console.log(info);
                return m("p", m("a", { href: "/details", oncreate: m.route.link,
                    onclick: function() {
                        police.currentCrime = info;
                    }
                }, info.type + " " + info.location.name));
            }): m("p", "No saved data.")
        ]);
    }
};

export default saved;
