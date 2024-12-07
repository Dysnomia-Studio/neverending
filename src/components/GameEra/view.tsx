import { Canvas2D, useWindowDimensions } from 'canvas2d-wrapper';

import GameEraInput from "../../models/GameEraInput";

import './index.css';

export default function GameEra({ era } : GameEraInput) {
	const { width, height } = useWindowDimensions();

	console.log({ width, height });

	return (
		<div className={`game-view-parent ${era}`}>
		<Canvas2D
			className="game-view"
			width={width / 3}
			height={width / 3 / 16 * 9}
			onFrame={() => []}
		/>
		<span className="era-name">{era.toUpperCase()}</span>
		</div>
	);
}
