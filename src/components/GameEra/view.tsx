import {
	Canvas2D,
	CanvasObject,
	useWindowDimensions,
} from 'canvas2d-wrapper';
import { useState } from 'react';

import GameEraPaletteLegend from '../GameEraPaletteLegend';

import useEnemies from '../../hooks/useEnemies';
import useMapContent from '../../hooks/useMapContent';

import GameEraInput from '../../models/GameEraInput';

import { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../../models/GameMapTile';

import ConvertTilesToCanvas2DElements from './gameEntitiesToCanvas/convertTilesToCanvas2DElements';
import ConvertEnemiesToCanvas2DElements from './gameEntitiesToCanvas/convertEnemiesToCanvas2DElements';

import './index.css';

export default function GameEra({ era } : GameEraInput) {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const { width } = useWindowDimensions();
	const mapContent = useMapContent(era);
	const enemies = useEnemies(era);

	const canvasWidth = width / 3;
	const tileSize = canvasWidth / GAMEMAP_TILES_AMOUNT_X;
	const canvasHeight = tileSize * GAMEMAP_TILES_AMOUNT_Y;

	return (
		<div className={`game-view-parent ${era}`}>
			<Canvas2D
				id={era}
				className="game-view"
				
				height={canvasHeight}
				width={canvasWidth}
				deltaLeft={-1 * (canvasWidth / 2)}
				deltaTop={-1 * (canvasHeight / 2)}

				lockXAxis={true}
				lockYAxis={true}

				onClick={console.log}
				onFrame={() => {
					if(mapContent === null) {
						console.error('Error when reading mapContent !');
						return [];
					}

					const showRanges : string[] = [];
					if(hoveredId !== null) {
						showRanges.push(hoveredId);
					}

					const convertedMapContent = mapContent.map((element) => ConvertTilesToCanvas2DElements(era, element, tileSize, showRanges)).flat();
					const convertedEntities = (enemies ?? []).map((entity) => ConvertEnemiesToCanvas2DElements(entity, tileSize)).flat();

					return [
						...convertedMapContent,
						...convertedEntities
					];
				}}
				onHover={(element : CanvasObject) => setHoveredId(element?.id)}
				onRightClick={console.log}
			/>
			<span className="era-name">{era.toUpperCase()}</span>
			<GameEraPaletteLegend era={era} />
		</div>
	);
}



