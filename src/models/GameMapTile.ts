import Position from './Position';
import TileType from './TileType';

export default interface GameMapTile {
	position: Position,
	tileType: TileType,
	range: number,
};

export const GAMEMAP_TILES_AMOUNT_X = 32;
export const GAMEMAP_TILES_AMOUNT_Y = 18;
