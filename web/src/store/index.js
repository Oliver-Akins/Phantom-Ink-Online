import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		team_1: {
			name: `Sun`,
			icon: ``,
			moons: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		team_2: {
			name: `Moon`,
			icon: ``,
			moons: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		writer_name: `Spirit`,
		guesser_name: `Medium`,

//===========================================================================//
		// DO NOT EDIT ANYTHING BELOW THIS COMMENT
		view: `lobby`,
		role: null,
		name: ``,
		id: null,
		players: [],
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
