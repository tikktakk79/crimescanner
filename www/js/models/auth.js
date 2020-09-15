import m from "mithril";
import police from "./police";

var apiAddress = "https://auth.emilfolino.se";
var apiKey = "6f9a72883adf734ca18ae4dbb399bbd1";

var auth = {
    email: "",
    password: "",
    token: "",
    loggedIn: false,
    storedData: [],

    clear: function () {
        auth.email = "";
        auth.password = "";
    },

    login: function() {
        var payload = {
            email: auth.email,
            password: auth.password,
            api_key: apiKey
        };

        console.log(payload.api_key);

        return m.request({
            url: apiAddress + "/login",
            method: "POST",
            data: payload
        }).then(function (result) {
            auth.token = result.data.token;
            console.log(auth.token);
            auth.loggedIn = true;
            m.route.set("/login_success");
        });
    },

    register: function () {
        let payload = {
            email: auth.email,
            password: auth.password,
            api_key: apiKey
        };

        return m.request({
            url: apiAddress + "/register",
            method: "POST",
            data: payload
        }).then(function () {
            m.route.set("/login");
        });
    },

    saveData: function() {
        console.log(police.currentCrime);
        let payload = {
            artefact: JSON.stringify(police.currentCrime),
            api_key: apiKey
        };

        return m.request({
            url: apiAddress + "/data",
            data: payload,
            method: "POST",
            headers: {
                'x-access-token': auth.token
            }
        }).then(function () {
            console.log("data saved");
        }).catch(function(e) {
            console.log("ERROR");
            console.log(e.message);
        });
    },

    getData: function() {
        return m.request({
            url: apiAddress + "/data?api_key=" + apiKey,
            method: "GET",
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(data) {
            auth.storedData = data.data;
        });
    }
};

export default auth;
