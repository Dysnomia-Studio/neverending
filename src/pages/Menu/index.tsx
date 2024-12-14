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

			<Link to="/game">Start game</Link>
			<Link to="/credits">Credits</Link>
			<a href="https://github.com/Dysnomia-Studio/neverending" target="_blank" rel="noopener noreferrer">Github</a>
		</div>
	);
}
