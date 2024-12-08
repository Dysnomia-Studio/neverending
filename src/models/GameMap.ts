import Era from './Era';
import GameMapTile from './GameMapTile';

export default interface GameMap {
	era: Era;
	content: GameMapTile[];
}

export const GAMEMAP_TILES_AMOUNT_X = 32;
export const GAMEMAP_TILES_AMOUNT_Y = 18;