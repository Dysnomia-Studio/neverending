import EnemyType from './EnemyType';
import KilledEnnemiesStats from './KilledEnnemiesStats';

export default interface GlobalGameContextModel {
	healthPoints: number,
	applyDamages: (amount : number) => void,
	regenHealth: (amount : number) => void,

	credits: number,
	spendCredits: (amount : number) => void,
	earnCredits: (amount : number) => void,

	score: KilledEnnemiesStats,
	addKilledEnemyToStats: (type : EnemyType) => void,
}

export const DEFAULT_HP = 25;
export const DEFAULT_CREDITS = 100;
