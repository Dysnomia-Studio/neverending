import {
	CanvasImage,
	Circle,
	Poly, 
	Rect,
} from 'canvas2d-wrapper';

import Era from '../../../models/Era';
import GameMapTile from '../../../models/GameMapTile';
import TileType from '../../../models/TileType';

 import palettes from './colorPalettes';

export default function ConvertTilesToCanvas2DElements(era: Era, value: GameMapTile, tileSize: number, showRanges : string[]) : (Circle | Rect | CanvasImage | Poly)[] {
	const currentId = value.tileType + '-' + value.position.x + '-' + value.position.y;
	const canvasElements = [];
	if(showRanges.includes(currentId)) {
		canvasElements.push(
			new Circle({
				id: 'range-' + currentId,
				x: (value.position.x + 0.5) * tileSize,
				y: (value.position.y + 0.5) * tileSize,
				radius: tileSize * value.range,
				fill: '#ff000055',
				zIndex: 10
			})
		);
	}

	canvasElements.push(
		new Rect({
			id: currentId,
			x: value.position.x * tileSize,
			y: value.position.y * tileSize,
			fill: palettes[era][value.tileType],
			height: tileSize,
			width: tileSize
		})
	);

	return canvasElements;
}