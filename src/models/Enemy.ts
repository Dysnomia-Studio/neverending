import EnemyType from './EnemyType';
import Position from './Position';

export default interface Enemy {
	enemyType: EnemyType;
	
	x: number;
	y: number;

	visitedTiles: Position[],
}
