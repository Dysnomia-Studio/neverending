import { useEffect } from 'react';

import moveEnemies from '../business/moveEnemies';
import shootEnemies from '../business/shootEnemies';

import useAddKilledEnemyToStats from './useAddKilledEnemyToStats';
import useAllMapsContent from './useAllMapsContent';
import useApplyDamages from './useApplyDamages';
import useEarnCredits from './useEarnCredits';
import useHealthPoints from './useHealthPoints';
import useSetEnemies from './useSetEnemies';

import Era from '../models/Era';
import EnemiesList from '../models/EnemiesList';
import EnemyType from '../models/EnemyType';
import GameMapTile from '../models/GameMapTile';

const SPAWN_INTERVAL = 10;
let timeBeforeNextEnemy = 0;

function resetTargets(map : GameMapTile[]) {
	for(const item of map) {
		item.targets = [];
	}
}

export default function useGameLoop() {
	const mapContent = useAllMapsContent();
	const applyDamages = useApplyDamages();
	const setEnemies = useSetEnemies();
	const earnCredits = useEarnCredits();
	const healthPoints = useHealthPoints();
	const addKilledEnemyToStats = useAddKilledEnemyToStats();

	useEffect(() => {
		if(mapContent === null || setEnemies === null || healthPoints <= 0 || earnCredits === null || addKilledEnemyToStats === null) {
			return;
		}

		const intervalId = setInterval(() => {
			const shouldSpawnEnemy = timeBeforeNextEnemy === 0;
			if(shouldSpawnEnemy) {
				timeBeforeNextEnemy = SPAWN_INTERVAL - 1;
			} else {
				timeBeforeNextEnemy--;
			}

			setEnemies((currEnemies) => {
				const newEnemiesList : EnemiesList = {};
				for(const era in Era) {
					const eraId = era.toLowerCase();

					resetTargets(mapContent[eraId]);

					const damagedEnemies = shootEnemies(currEnemies[eraId], mapContent[eraId], earnCredits, addKilledEnemyToStats); // TODO apply damages, remove killed enemies, add credits
					const movedEnemies = moveEnemies(damagedEnemies, mapContent[eraId], applyDamages);

					if(shouldSpawnEnemy) {
						movedEnemies.push({
							enemyType: EnemyType.Dark_Knight,
							position: { 
								x: 0,
								y: 9,
							},
							visitedTiles: [],
							damages: 1,
							health: 10,
							maxHealth: 10
						});
					}

					newEnemiesList[era.toLowerCase()] = movedEnemies;
				}

				return newEnemiesList;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [mapContent, applyDamages, setEnemies, healthPoints]);

	return
}