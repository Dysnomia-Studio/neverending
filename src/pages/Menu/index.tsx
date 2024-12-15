import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import './index.css';

const clock = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛' ];

export default function Menu() {
	const [currClock, setCurrClock] = useState(1);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrClock(c => (c >= (clock.length - 1)) ? 0 : c + 1);
		}, 500);

		return () => clearInterval(intervalId);
	}, [])

	return (
		<div className="menu">
			<h1><span className="clock">{clock[currClock]}</span><span className="medieval">Neve</span><span className="modern">ren</span><span className="future">ding</span><span className="clock">{clock[currClock]}</span></h1>

			<p>Note: I wasn't able to finish the game on time for the gamejam, the game in its actual state isn't playable. You can take a look in "Start game" to know what was my last stable version. And take a look in the Game Design Document and TODO.md on Github to see what was left for this prototype.<br/>
			It may be updated after HonestJam's rating period.</p>

			<Link to="/game">Start game</Link>
			<Link to="/credits">Credits</Link>
			<a href="https://github.com/Dysnomia-Studio/neverending" target="_blank" rel="noopener noreferrer">Github</a>
			<a href="https://docs.google.com/document/d/13qa7aEOF8PbOszvkcduzts7GgkT00R6T5ZtDrRG6rKo/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Game Design Document</a>
		</div>
	);
}
