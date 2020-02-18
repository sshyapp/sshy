import App from "./components/App.vue";
import jQuery from "jquery";
import popper from "popper.js";
import Vue from "vue";

window._ = require("lodash");

try {
    window.Popper = popper.default;
    window.$ = window.jQuery = jQuery;

    require("bootstrap");
} catch (e) {}

new Vue({
    components: {
        App,
    },
    el: "#app",
});
