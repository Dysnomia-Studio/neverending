import Era from './Era';
import GameMapTile from './GameMapTile';

export default interface GameMap {
	era: Era;
	content: GameMapTile[];
}

export const GAMEMAP_TILES_AMOUNT_X = 40;
export const GAMEMAP_TILES_AMOUNT_Y = 23;