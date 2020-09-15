import m from "mithril";

var loginSuccess = {
    view: function () {
        return m("main.container", [
            m("p", "Lyckad inloggning"),
        ]);
    }
};

export default loginSuccess;
