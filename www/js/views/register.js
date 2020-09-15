"use strict";

import auth from "../models/auth";
import m from "mithril";

var register = {
    view: function () {
        return m("main.container", [
            m("h1", "Registrering"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    auth.register();
                }
            }, [
                m("label.input-label", "Mejladress"),
                m("input[type=email].input", {
                    oninput: function (e) {
                        auth.email = e.target.value;
                    }
                }),
                m("label.input-label", "Password"),
                m("input[type=password].input", {
                    oninput: function (e) {
                        auth.password = e.target.value;
                    }
                }),
                m("input[type=submit][value=Registrera användare].button", "Registera")
            ])
        ]);
    }
};

export default register;
