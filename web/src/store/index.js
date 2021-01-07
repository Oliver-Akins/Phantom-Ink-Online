import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		team_1: {
			name: `Sun`,
			icon: `sun.svg`,
			eyes: {
				1: 0,	2: 0,
				3: 0,	4: 1,
				5: 0,	6: 1,
				7: 1,	8: 0,
			},
		},
		team_2: {
			name: `Moon`,
			icon: `moon.svg`,
			eyes: {
				1: 0,	2: 0,
				3: 1,	4: 0,
				5: 1,	6: 1,
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
		team: null,
		name: ``,
		is_host: false,
		chosen_object: null,
		questions: [],
		game_code: null,
		players: [],
		answers: {
			team_1: [ ``, ``, ``, ``, ``, ``, ``, `` ],
			team_2: [ ``, ``, ``, ``, ``, ``, ``, `` ],
		}
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
		resetState(state) {
			state.view = `login`;
			state.role = null;
			state.team = null;
			state.name = ``;
			state.is_host = false;
			state.chosen_object = null;
			state.questions = [];
			state.game_code = null;
			state.players = [];
			state.answers = {
				team_1: new Array(8).fill(``),
				team_2: new Array(8).fill(``),
			};
		},
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
		gameCode(state, game_code) {
			state.game_code = game_code;
		},
		view(state, target) {
			state.view = target;
		},
		playerList(state, players) {
			state.players = players;
		},
		updatePlayer(state, data) {
			for (var player of state.players) {
				if (player.name == data.name) {
					player.role = data.role;
					player.team = data.team;
				};
			};
		},
		newPlayer(state, player) {
			state.players.push(player);
		},
		setObject(state, chosenObject) {
			state.chosen_object = chosenObject;
		},
		replaceHand(state, questions) {
			state.questions = questions;
		},
		appendToHand(state, questions) {
			state.questions.push(...questions);
		},
		updateAnswer(state, data) {
			state.answers[`team_${data.team}`].splice(data.answer - 1, 1, data.value)
		},
		setAnswers(state, data) {
			state.answers = Vue.reactive(data);
		},
	},
	actions: {
	},
	modules: {
	},
});