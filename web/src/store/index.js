import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		team_1: {
			name: `Sun`,
			icon: `sun.svg`,
			eyes: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		team_2: {
			name: `Moon`,
			icon: `moon.svg`,
			eyes: {
				1: 0,	2: 0,
				3: 0,	4: 0,
				5: 0,	6: 0,
				7: 0,	8: 0,
			},
		},
		writer_name: `Spirit`,
		writer_card_button: `Answer Question`,
		writer_object_choose_button: `Choose Object`,

		guesser_name: `Medium`,
		guesser_card_button: `Ask Spirit`,
		eye_icon: `eye.svg`,

		discard_hand_icon: `trash.svg`,

//===========================================================================//
		// DO NOT EDIT ANYTHING BELOW THIS COMMENT
		view: `login`,
		role: null,
		team: 2,
		name: ``,
		id: null,
		players: [],
		chosen_object: null,
		questions: [],
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
		},
	},
	mutations: {
		player(state, data) {
			if (data.name)
				state.name = data.name
			if (data.role)
				state.role = data.role
			if (data.team)
				state.team = data.team
			if (data.host)
				state.is_host = data.host
		},
		game_code(state, game_code) {
			state.game_code = game_code;
		},
		view(state, target) {
			state.view = target;
		},
	},
	actions: {
	},
	modules: {
	},
	plugins: [
		new VuexPersistence().plugin,
	]
})
