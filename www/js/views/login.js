"use strict";

import m from "mithril";

import auth from "../models/auth.js";

var login = {
    oninit: auth.clear,
    view: function () {
        return m("main.container", [
            m("h1", "Logga in"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    auth.login();
                }
            }, [
                m("label.input-label", "E-post"),
                m("input[type=email].input", {
                    oninput: function (e) {
                        auth.email = e.target.value;
                    }
                }),
                m("label.input-label", "Lösenord"),
                m("input[type=password].input", {
                    oninput: function (e) {
                        auth.password = e.target.value;
                    }
                }),

                m("input[type=submit][value=Logga in].button", "Logga in")
            ])
        ]);
    }
};

export default login;
