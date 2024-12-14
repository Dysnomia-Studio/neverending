import { useEffect } from 'react';

import moveEnemies from '../business/moveEnemies';

import useAllMapsContent from './useAllMapsContent';
import useApplyDamages from './useApplyDamages';
import useSetEnemies from './useSetEnemies';

import Era from '../models/Era';
import EnemiesList from '../models/EnemiesList';

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

					newEnemiesList[era.toLowerCase()] = movedEnemies;
				}

				return newEnemiesList;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [mapContent, applyDamages]);

	return
}