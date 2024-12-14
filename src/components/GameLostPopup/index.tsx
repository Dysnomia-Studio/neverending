import { Link } from 'react-router';

import useScore from '../../hooks/useScore';

import './index.css';

export default function GameLostPopup() {
	const score = useScore();
	const scoreTable = [];
	if(score !== null) {
		for(const scoreKey in score) {
			scoreTable.push(<span><b>{scoreKey}:</b> {score[scoreKey]}</span>);
		}
	}

	return (
		<div className="game-lost-popup">
			<Link to="/">↩ Back to menu</Link>
			<h1>You lost !</h1>
			<p>Score:</p>
			{scoreTable}
		</div>
	);
}
