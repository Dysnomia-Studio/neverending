import Enemy from '../models/Enemy';
import GameMapTile from '../models/GameMapTile';

import getPathAround from './getPathAround';

export default function moveEnemies(currEnemies: Enemy[], mapContent : GameMapTile[], applyDamages: (amount: number) => void ): Enemy[] {
    const newEnemies = [];
    for(const enemy of currEnemies) {
    	const neighboors = getPathAround(mapContent, enemy.position.x, enemy.position.y);
    	const validNeighboors = neighboors.filter(n => n.position.x >= enemy.position.x && !enemy.visitedTiles.find(t => t.x === n.position.x && t.y === n.position.y));
    	if(validNeighboors.length === 0) { // We're at the base
    		applyDamages(enemy.damages);
    		continue;
    	}

    	// TODO: prevent NPC going down in Medieval map on (20,9)

    	const newPosition = validNeighboors[Math.round(Math.random() * (validNeighboors.length - 1))].position; 

    	enemy.visitedTiles.push({ ...enemy.position });
    	enemy.position.x = newPosition.x;
    	enemy.position.y = newPosition.y;

    	newEnemies.push(enemy);
    }

    return newEnemies;
}
