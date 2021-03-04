import Vue from 'vue';
import App from './App.vue';
import store from './store';
import io from 'socket.io-client';
import clipboard from "vue-clipboard2";
import VueSocketIOExt from 'vue-socket.io-extended';
import {websocket_uri, dev_websocket_uri} from "./config";

Vue.config.productionTip = false;

Vue.use(clipboard);
Vue.use(VueSocketIOExt, io(
	process.env.NODE_ENV === `development` ? dev_websocket_uri : websocket_uri
));

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');