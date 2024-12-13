import EnemyType from './EnemyType';
import Position from './Position';

export default interface Enemy {
	enemyType: EnemyType;
	
	position: Position,

	visitedTiles: Position[],

	damages: number,

	health: number,
	maxHealth: number,
}
