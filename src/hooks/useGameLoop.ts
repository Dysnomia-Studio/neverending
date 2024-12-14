import { useEffect } from 'react';

import moveEnemies from '../business/moveEnemies';
import shootEnemies from '../business/shootEnemies';

import useAllMapsContent from './useAllMapsContent';
import useApplyDamages from './useApplyDamages';
import useEarnCredits from './useEarnCredits';
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

	useEffect(() => {
		if(mapContent === null || setEnemies === null) {
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

					const damagedEnemies = shootEnemies(currEnemies[eraId], mapContent[eraId], earnCredits); // TODO apply damages, remove killed enemies, add credits
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
		}, 100);

		return () => clearInterval(intervalId);
	}, [mapContent, applyDamages, setEnemies]);

	return
}