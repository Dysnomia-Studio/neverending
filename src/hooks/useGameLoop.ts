import { useEffect } from 'react';

import moveEnemies from '../business/moveEnemies';

import useAllMapsContent from './useAllMapsContent';
import useApplyDamages from './useApplyDamages';
import useSetEnemies from './useSetEnemies';

import Era from '../models/Era';
import EnemiesList from '../models/EnemiesList';
import EnemyType from '../models/EnemyType';

const SPAWN_INTERVAL = 10;
let timeBeforeNextEnemy = 0;

export default function useGameLoop() {
	const mapContent = useAllMapsContent();
	const applyDamages = useApplyDamages();
	const setEnemies = useSetEnemies();

	useEffect(() => {
		if(mapContent === null || setEnemies === null) {
			return;
		}

		const intervalId = setInterval(() => {
			setEnemies((currEnemies) => {
				const newEnemiesList : EnemiesList = {};
				for(const era in Era) {
					const damagedEnemies = currEnemies[era.toLowerCase()]; // TODO
					const movedEnemies = moveEnemies(damagedEnemies, mapContent[era.toLowerCase()], applyDamages);

					if(timeBeforeNextEnemy === 0) {
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

			if(timeBeforeNextEnemy === 0) {
				timeBeforeNextEnemy = SPAWN_INTERVAL - 1;
			} else {
				timeBeforeNextEnemy--;
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [mapContent, applyDamages]);

	return
}