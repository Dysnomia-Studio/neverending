import GameMapTile from '../models/GameMapTile';

export default function getTileId(tile : GameMapTile) {
	return tile.tileType + '-' + tile.position.x + '-' + tile.position.y;
}
