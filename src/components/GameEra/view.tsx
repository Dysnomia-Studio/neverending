import {
	Canvas2D,
	CanvasObject,
	useWindowDimensions,
} from 'canvas2d-wrapper';
import { useState } from 'react';

import getTileId from '../../business/getTileId';

import GameEraPaletteLegend from '../GameEraPaletteLegend';

import useEnemies from '../../hooks/useEnemies';
import useMapContent from '../../hooks/useMapContent';

import GameEraInput from '../../models/GameEraInput';
import Position from '../../models/Position';
import TileType from '../../models/TileType';

import { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../../models/GameMapTile';

import ConvertTilesToCanvas2DElements from './gameEntitiesToCanvas/convertTilesToCanvas2DElements';
import ConvertEnemiesToCanvas2DElements from './gameEntitiesToCanvas/convertEnemiesToCanvas2DElements';

import './index.css';

export default function GameEra({ era } : GameEraInput) {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [isBuildingTurret, setIsBuildingTurret] = useState<boolean>(false);
	const [ghostPosition, setGhostPosition] = useState<Position | null>(null);

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

					let tiles = [...mapContent];
					if(ghostPosition !== null) {
						tiles = tiles.filter(t => 
							!(t.position.x === ghostPosition.x &&
							  t.position.y === ghostPosition.y)
						);
						const newElement = {
                            position: { ...ghostPosition },
                            range: 3, // TODO
                            damages: 0,
                            tileType: TileType.Turret,
                            targets: [],
                        };
						tiles.push(newElement);

                        showRanges.push(getTileId(newElement));
					}

					const convertedMapContent = tiles.map((element) => ConvertTilesToCanvas2DElements(era, element, tileSize, showRanges)).flat();
					const convertedEntities = (enemies ?? []).map((entity) => ConvertEnemiesToCanvas2DElements(entity, tileSize)).flat();

					return [
						...convertedMapContent,
						...convertedEntities
					];
				}}
				onHover={(element : CanvasObject) => {
					if(isBuildingTurret && element?.id?.startsWith('turret')) {
						const foundElement = mapContent?.find(e => getTileId(e) === element?.id)?.position;
						if(foundElement) {
							setGhostPosition(foundElement);
						} else {
						}
					} else {
						setGhostPosition(null);
					}
					setHoveredId(element?.id);
				}}
				onRightClick={console.log}
			/>
			<span className="era-name">{era.toUpperCase()}</span>
			<div>
				<input
					id={`build-turret-${era}`}
					type="checkbox"
					value={isBuildingTurret.toString()}
					onChange={(e) => setIsBuildingTurret(e.target.checked)}
				/> <label htmlFor={`build-turret-${era}`} >Build turrets</label>
			</div>
			<GameEraPaletteLegend era={era} />
		</div>
	);
}



