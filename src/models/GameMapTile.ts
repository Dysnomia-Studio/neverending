import Position from './Position';
import TileType from './TileType';

export default interface GameMapTile {
	position: Position,
	tileType: TileType,
	range: number,
}
