import Enemy from '../models/Enemy';
import EnemyType from '../models/EnemyType';
import GameMapTile from '../models/GameMapTile';
import TileType from '../models/TileType';

function isInCircle(originX : number, originY : number, radius : number, targetX : number, targetY : number) : boolean {
	const distance = (
		(originX - targetX) * (originX - targetX) +
		(originY - targetY) * (originY - targetY)
	);

	return (distance <= (radius * radius));
}

export default function shootEnemies(currEnemies: Enemy[], mapContent : GameMapTile[], earnCredits : (amount : number) => void, addKilledEnemies : (type: EnemyType) => void) {
	for(const enemy of currEnemies) {
		const matchingTurrets = mapContent.filter((tile) => tile.tileType === TileType.Turret && isInCircle(tile.position.x, tile.position.y, tile.range, enemy.position.x, enemy.position.y));
		const totalDamages = matchingTurrets.reduce((acc, curr) => acc + (curr.damages ?? 0), 0);

		enemy.health -= totalDamages;

		for(const matchingTurret of matchingTurrets) {
			matchingTurret.targets.push(enemy);
		}
	}

	const killedEnemies = currEnemies.filter((e) => e.health <= 0);
	const additionalMoney = killedEnemies.reduce((acc, curr) => acc + curr.maxHealth, 0);
	if(additionalMoney !== 0) {
		earnCredits(additionalMoney);
	}
	for(const killedEnemy of killedEnemies) {
		addKilledEnemies(killedEnemy.enemyType);
	}

	return currEnemies.filter((e) => e.health > 0)
}