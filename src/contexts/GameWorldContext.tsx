import { createContext, useEffect, useState } from 'react';

import EnemiesList from '../models/EnemiesList';
import EnemyType from '../models/EnemyType';
import Era from '../models/Era';
import GameMapList from '../models/GameMapList';
import GameWorldContextModel from '../models/GameWorldContextModel';
import getDefaultMapForEra from '../business/getDefaultMapForEra';

export const GameWorldContext = createContext<GameWorldContextModel | null>(null);

export default function GameWorldContextProvider({ children } : { children: React.ReactNode }) {
	const [gameMapsContent, setGameMapContent]  = useState<GameMapList>({});
	const [enemies, setEnemies]  = useState<EnemiesList>({});

	useEffect(() => {
		const newEnemies : EnemiesList = {};
		const newMapContent : GameMapList = {};

		for(const era in Era) {
			newEnemies[era.toLowerCase()] = [{
				enemyType: EnemyType.Dark_Knight,
				position: { 
					x: 0,
					y: 9,
				},
				visitedTiles: [],
				damages: 1,
				health: Math.round(Math.random() * 10),
				maxHealth: 10
			}];
			newMapContent[era.toLowerCase()] = getDefaultMapForEra(era as Era);
		}

		setEnemies(newEnemies);
		setGameMapContent(newMapContent);
	}, []);

	return (
		<GameWorldContext.Provider value={{
			enemies,
			setEnemies,
			maps: gameMapsContent,
		}}>
			{children}
		</GameWorldContext.Provider>
	);
}