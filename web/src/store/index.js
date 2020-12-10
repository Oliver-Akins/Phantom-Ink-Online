import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		team_1: {
			name: `Sun`,
			icon: ``,
			eyes: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		team_2: {
			name: `Moon`,
			icon: ``,
			eyes: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		writer_name: `Spirit`,
		guesser_name: `Medium`,
		eye_icon: `eye.svg`,

//===========================================================================//
		// DO NOT EDIT ANYTHING BELOW THIS COMMENT
		view: `lobby`,
		role: null,
		name: ``,
		id: null,
		players: [],
	},
	getters: {
		teamName(state) {
			if (state.team > 0) {
				return state[`team_${state.team}`].name;
			};
			return ``;
		},
		otherTeamName(state) {
			if (state.team > 0) {
				return state[`team_${3 - state.team}`].name;
			};
			return ``;
		}
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
