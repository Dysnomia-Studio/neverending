import GameEra from "../../components/GameEra";

import Era from "../../models/Era";

import './index.css';

export default function Game() {
	return (
		<div className="game">
			<GameEra era={Era.Medieval} />
			<GameEra era={Era.Modern} />
			<GameEra era={Era.Future} />
		</div>
	)
}
