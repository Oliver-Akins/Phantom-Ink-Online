import Vue from 'vue';
import App from './App.vue';
import store from './store';
import io from 'socket.io-client';
import clipboard from "vue-clipboard2";
import VueSocketIOExt from 'vue-socket.io-extended';

Vue.config.productionTip = false;

// Get the URI for 
let websocket_uri = `/`;
if (process.env.NODE_ENV === `development`) {
	websocket_uri = `http:${window.location.hostname}:8081`;
};

Vue.use(clipboard);
Vue.use(VueSocketIOExt, io(websocket_uri));

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');