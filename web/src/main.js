import Vue from 'vue';
import App from './App.vue';
import store from './store';
import io from 'socket.io-client';
import clipboard from "vue-clipboard2";
import VueSocketIOExt from 'vue-socket.io-extended';

Vue.config.productionTip = false;

Vue.use(clipboard);
Vue.use(VueSocketIOExt, io(`http://${window.location.hostname}:8081`));

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');