export default interface GlobalGameContextModel {
	healthPoints: number,
	applyDamages: (amount : number) => void,
	regenHealth: (amount : number) => void,
}

export const DEFAULT_HP = 25;
