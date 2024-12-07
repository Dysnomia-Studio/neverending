import { createContext, useEffect, useState } from 'react';

import Era from '../models/Era';
import GameMap, { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../models/GameMap';
import GameMapTile from '../models/GameMapTile';

export const GameMapContext = createContext<GameMap[]>([]);

const defaultEntries : GameMapTile[] = [];
for(let x = 0; x < GAMEMAP_TILES_AMOUNT_X; x++) {
	for(let y = 0; y < GAMEMAP_TILES_AMOUNT_Y; y++) {
		defaultEntries.push({
			x,
			y,
		});
	}
}

export default function GameMapContextProvider({ children } : { children: React.ReactNode }) {
	const [gameMapsContent, setGameMapContent]  = useState<GameMap[]>([]);

	useEffect(() => {
		setGameMapContent([{
			era: Era.Medieval,
			content: [...defaultEntries]
		}, {
			era: Era.Modern,
			content: [...defaultEntries]
		}, {
			era: Era.Future,
			content: [...defaultEntries]
		}])
	}, []);

	return (
		<GameMapContext.Provider value={gameMapsContent}>
			{children}
		</GameMapContext.Provider>
	);
}