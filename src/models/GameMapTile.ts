import Enemy from './Enemy';
import Position from './Position';
import TileType from './TileType';

export default interface GameMapTile {
	damages?: number | undefined,
	position: Position,
	range: number,
	tileType: TileType,
	targets: Enemy[],
};

export const GAMEMAP_TILES_AMOUNT_X = 32;
export const GAMEMAP_TILES_AMOUNT_Y = 18;
