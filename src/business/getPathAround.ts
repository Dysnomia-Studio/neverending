import GameMapTile from '../models/GameMapTile';
import TileType from '../models/TileType';

export default function getPathAround(mapContent: GameMapTile[], x: number, y: number) : GameMapTile[] {
    return [
    	mapContent.find(t => t.position.x === x && t.position.y === y - 1),
    	mapContent.find(t => t.position.x === x && t.position.y === y + 1),
    	mapContent.find(t => t.position.x === x - 1 && t.position.y === y),
    	mapContent.find(t => t.position.x === x + 1 && t.position.y === y),
    ].filter(x => typeof x !== 'undefined').filter(x => x.tileType === TileType.Path);
}
