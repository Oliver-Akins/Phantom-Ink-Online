import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		view: `lobby`,
		role: null,
		name: ``,
		id: null,
		team_1: {
			name: `Sun`,
		},
		team_2: {
			name: `Moon`,
		},
		writer_name: `Spirit`,
		guesser_name: `Medium`,
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
