import { Link } from 'react-router';

import GameEra from '../../components/GameEra';
import GameLostPopup from '../../components/GameLostPopup';

import useGameLoop from '../../hooks/useGameLoop';
import useHealthPoints from '../../hooks/useHealthPoints';
import useUserCredits from '../../hooks/useUserCredits';

import Era from '../../models/Era';

import './index.css';

export default function Game() {
	useGameLoop();

	const healthPoints = useHealthPoints();
	const credits = useUserCredits();
	if(healthPoints <= 0) {
		return (<GameLostPopup />);
	}

	return (
		<>
			<Link to="/" className="back-to-menu">↩ Back to menu</Link>
			<div className="game">
				<GameEra era={Era.Medieval} />
				<GameEra era={Era.Modern} />
				<GameEra era={Era.Future} />
			</div>
			<div className="game-sidebar">
				<p>HP: {healthPoints}</p>
				<p>Credits: {credits}</p>
			</div>
		</>
	);
}
