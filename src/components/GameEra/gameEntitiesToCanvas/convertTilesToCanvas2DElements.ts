import {
	CanvasImage,
	Circle,
	Poly, 
	Rect,
} from 'canvas2d-wrapper';

import GameMapTile from '../../../models/GameMapTile';
import TileType from '../../../models/TileType';

export default function ConvertTilesToCanvas2DElements(value: GameMapTile, tileSize: number) : (Circle | Rect | CanvasImage | Poly)[] {
	let color : string = '#666666';
	switch(value.tileType) {
		case TileType.Building:
			color = '#006666';
			break;
		case TileType.Path:
			color = '#4d004d';
			break;
		case TileType.Player_Base:
			color = '#FF0000';
			break;
		case TileType.Turret_Slot:
			color = '#777777';
			break;
		case TileType.Turret:
			color = '#222222';
			break;
		case TileType.Unbuildable:
			color = '#006600';
			break;
	}

	return new Rect({
		id: value.position.x + '-' + value.position.y,
		x: value.position.x * tileSize,
		y: value.position.y * tileSize,
		fill: color,
		height: tileSize,
		width: tileSize
	});
}