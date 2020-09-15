"use strict";

import m from 'mithril';
import auth from "../models/auth.js";
import police from "../models/police.js";
import connection from "../models/connection.js";

let layout = {
    view: function(vnode) {
        let homeClass = "";
        let mapClass = "";
        let savedClass = "";
        let detailsClass = "";
        let currRoute = m.route.get().split("/")[1];

        if (currRoute === "mapcrime") {
            mapClass = ".active";
        } else if (currRoute === "" ) {
            homeClass = ".active";
        } else if (currRoute === "details") {
            detailsClass = ".active";
        } else if (currRoute === "saved") {
            savedClass = ".active";
        }

        return [
            m("nav.top-nav",
                { textContent: "CRIME"},
                [
                    m("span", [
                        m("a", { href: "/register", oncreate: m.route.link}, "Registrera")
                    ]),
                    m("span#right", [
                        (!auth.loggedIn) ? m("a", { href: "/login", oncreate: m.route.link},
                            "Logga in")
                            : m("p", "Logged in")
                    ])
                ]),
            m("nav.bottom-nav", [
                m("a" + homeClass, { href: "/", class: "home", oncreate: m.route.link}, [
                    (connection.connected)? m("i.material-icons", "home") : m("p", "Hem"),
                    (connection.connected)? m("span.icon-text", "Hem"): null
                ]),
                (Object.keys(police.currentCrime).length > 0) ? m("a" + mapClass,
                    { href: "/mapcrime", class: "list",
                        oncreate: m.route.link }, [
                        (connection.connected)? m("i.material-icons", "local_shipping"):
                            m("p", "Karta"),
                        (connection.connected)? m("span.icon-text", "karta"): null
                    ]): null,
                (Object.keys(police.currentCrime).length > 0) ? m("a" + detailsClass,
                    { href: "/details", class: "people",
                        oncreate: m.route.link }, [
                        (connection.connected)? m("i.material-icons", "list"): null,
                        (connection.connected)? m("span.icon-text", "Detaljer"): m("p", "Detaljer")
                    ]): null,
                auth.loggedIn ?
                    m("a" + savedClass, { href: "/saved", class: "folder",
                        oncreate: m.route.link }, [
                        (connection.connected)? m("i.material-icons", "save"): null,
                        (connection.connected)? m("span.icon-text", "Sparat"): m("p", "Sparat")
                    ]): null
            ]),
            m("main.container", vnode.children)
        ];
    }
};

export default layout;
