import GameEra from '../../components/GameEra';
import useHealthPoints from '../../hooks/useHealthPoints';

import Era from '../../models/Era';

import './index.css';

export default function Game() {
	const healthPoints = useHealthPoints();

	return (
		<>
		<div className="game">
			<GameEra era={Era.Medieval} />
			<GameEra era={Era.Modern} />
			<GameEra era={Era.Future} />
		</div>
		<div className="game-sidebar">
			HP: {healthPoints}
		</div>
		</>
	)
}
