/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import m from "mithril";

import layout from "./views/layout.js";

import login from "./views/login.js";
import register from "./views/register.js";
import loginSuccess from "./views/login_success.js";

import near from "./views/near.js";
import mapCrime from "./views/mapcrime.js";
import details from "./views/details.js";
import saved from "./views/saved.js";

import connection from "./models/connection.js";



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        document.addEventListener("online", function() {
            connection.connected = true;
            m.redraw();
        }, false);
        document.addEventListener("offline", function() {
            connection.connected = false;
            m.redraw();
        }, false);
        m.route(document.body, "/", {
            "/": {
                render: function() {
                    return m(layout, m(near));
                }
            },


            "/mapcrime": {
                render: function() {
                    return m(layout, m(mapCrime));
                }
            },

            "/details": {
                render: function() {
                    return m(layout, m(details));
                }
            },

            "/login": {
                render: function () {
                    return m(layout, m(login));
                }
            },

            "/register": {
                render: function () {
                    return m(layout, m(register));
                }
            },

            "/login_success": {
                render: function () {
                    return m(layout, m(loginSuccess));
                }
            },

            "/saved": {
                render: function(vnode) {
                    return m(layout, m(saved, vnode.attrs));
                }
            }
        });
    },
};

app.initialize();
