import { Canvas2D, useWindowDimensions, Rect } from 'canvas2d-wrapper';

import useMapContent from '../../hooks/useMapContent';

import GameEraInput from '../../models/GameEraInput';
import GameMapTile from '../../models/GameMapTile';

import './index.css';
import { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../../models/GameMap';

function ConvertToCanvas2DElements(value: GameMapTile, tileSize: number): unknown {
	return new Rect({
		id: value.x + '-' + value.y,
		x: value.x * tileSize,
		y: value.y * tileSize,
		fill: ((value.x + value.y) % 2 === 0) ? '#4d004d' : '#666666',
		height: tileSize,
		width: tileSize
	});
}

export default function GameEra({ era } : GameEraInput) {
	const { width, height } = useWindowDimensions();
	const mapContent = useMapContent(era);

	const canvasWidth = width / 3;
	const tileSize = canvasWidth / GAMEMAP_TILES_AMOUNT_X;
	const canvasHeight = tileSize * GAMEMAP_TILES_AMOUNT_Y;

	return (
		<div className={`game-view-parent ${era}`}>
		<Canvas2D
			className="game-view"
			
			height={canvasHeight}
			width={canvasWidth}
			deltaLeft={-1 * (canvasWidth / 2)}
			deltaTop={-1 * (canvasHeight / 2)}

			lockXAxis={true}
			lockYAxis={true}

			onClick={() => []}
			onFrame={() => mapContent?.content.map((element) => ConvertToCanvas2DElements(element, tileSize)).flat() }
			onHover={() => []}
			onRightClick={() => []}
		/>
		<span className="era-name">{era.toUpperCase()}</span>
		</div>
	);
}
