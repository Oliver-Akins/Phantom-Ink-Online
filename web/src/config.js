/**
 * The survey that will be offered to players to fill out after finishing a
 * game so that they can give feedback.
 */
export const survey_url = ``;


/**
 * This is an array of per-team settings, each team object consists of the
 * following properties:
 *
 * name: string - The name of the team
 * icon: string - The name of the icon used for the team
 * eyes: object - The object of the answer index to how many eyes are on that spot
 *
 * There can be as many teams in this array as desired, but only the first two
 * will be used.
 */
export const team_settings = [
	{
		name: `Sun`,
		icon: `sun.svg`,
		eyes: {
			1: 0,	2: 0,
			3: 0,	4: 1,
			5: 0,	6: 1,
			7: 1,	8: 0,
		}
	},
	{
		name: `Moon`,
		icon: `moon.svg`,
		eyes: {
			1: 0,	2: 0,
			3: 1,	4: 0,
			5: 1,	6: 1,
			7: 0,	8: 0,
		}
	}
];


/**
 * The name that is displayed for the players that answer the questions.
 */
export const writer_name = `Spirit`;

/**
 * The name that is displayed for the players that are trying to guess the
 * object.
 */
export const guesser_name = `Medium`;


/**
 * The URI that socket IO tries to connect to for websocket communication when
 * built for production serving.
 */
export const websocket_uri = `/`;

/**
 * The websocket URI that Socket.IO tries to connect to when live-serving the
 * site via webpack.
 */
export const dev_websocket_uri = `http://${window.location.hostname}:8081`;