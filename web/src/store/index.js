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
			moons: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		team_2: {
			name: `Moon`,
			moons: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
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
