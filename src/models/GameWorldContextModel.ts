import EnemiesList from './EnemiesList';
import GameMapList from './GameMapList';

export default interface  GameWorldContextModel {
	enemies: EnemiesList,
	maps: GameMapList,
	setEnemies: (func: (currEnemeis: EnemiesList) => EnemiesList) => void,
}
