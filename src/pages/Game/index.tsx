import GameEra from '../../components/GameEra';

import useHealthPoints from '../../hooks/useHealthPoints';
import useUserCredits from '../../hooks/useUserCredits';

import Era from '../../models/Era';

import './index.css';

export default function Game() {
	const healthPoints = useHealthPoints();
	const credits = useUserCredits();

	return (
		<>
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
	)
}
