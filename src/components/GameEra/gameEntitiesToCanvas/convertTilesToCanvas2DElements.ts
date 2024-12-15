import { CanvasObject, Circle, Rect } from 'canvas2d-wrapper';

import getTileId from '../../../business/getTileId';

import palettes from './colorPalettes';

import Era from '../../../models/Era';
import GameMapTile from '../../../models/GameMapTile';


export default function ConvertTilesToCanvas2DElements(era: Era, currentTile: GameMapTile, tileSize: number, showRanges : string[]) : CanvasObject[] {
	const currentId = getTileId(currentTile);
	const canvasElements = [];
	if(showRanges.includes(currentId)) {
		canvasElements.push(
			new Circle({
				id: 'range-' + currentId,
				x: (currentTile.position.x + 0.5) * tileSize,
				y: (currentTile.position.y + 0.5) * tileSize,
				radius: tileSize * currentTile.range,
				fill: '#ff000055',
				zIndex: 10
			})
		);
	}

	canvasElements.push(
		new Rect({
			id: currentId,
			x: currentTile.position.x * tileSize,
			y: currentTile.position.y * tileSize,
			fill: palettes[era][currentTile.tileType],
			height: tileSize,
			width: tileSize
		})
	);

	return canvasElements;
}