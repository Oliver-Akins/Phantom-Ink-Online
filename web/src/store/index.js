import Vue from 'vue';
import Vuex from 'vuex';
import * as conf from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		survey_link: conf.survey_url,

		team_1: conf.team_settings[0],
		team_2: conf.team_settings[1],

		writer_name: conf.writer_name,
		writer_card_button: `Answer Question`,
		writer_object_choose_button: `Choose Object`,

		guesser_name: conf.guesser_name,
		guesser_card_button: `Ask Spirit`,

		eye_icon: conf.eye_icon,

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
			state.answers.team_1 = data.team_1;
			state.answers.team_2 = data.team_2;
		},
	},
	actions: {
	},
	modules: {
	},
});