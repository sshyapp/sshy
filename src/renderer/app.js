import App from './components/App.vue';
import jQuery from 'jquery';
import popper from 'popper.js';
import Vue from 'vue';
// import {ipcRenderer} from 'electron';

window._ = require('lodash');

try {
    window.Popper = popper.default;
    window.$ = window.jQuery = jQuery;
    // window.ipcRenderer = ipcRenderer;

    require('bootstrap');
} catch (e) {}

new Vue({
    components: {
        App,
    },
    el: `#app`,
});
