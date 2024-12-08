import { createContext, useEffect, useState } from 'react';

import Era from '../models/Era';
import GameMap, { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../models/GameMap';
import GameMapTile from '../models/GameMapTile';
import TileType from '../models/TileType';

export const GameMapContext = createContext<GameMap[]>([]);

const map = `
????????????????????????????????
?..............................?
?..............................?
?UUUUUUU.......................?
?UPPPPPT.......................?
?UPU.UPUB......................?
?UPU.UPU.......................?
?UPU.UPTUUUUU..................?
PPPT.UPPPPPPP..................?
PPPUBUUUUUUUU..................?
?UPU....UPPPP..................?
?UPU....UPUUU..................?
?UPTUUU.UPU....................?
?UPPPPU.UPU....................?
?UUUUPUTUPU....................?
?...UPPPPPU....................?
???.UUUUUUU....................?
????????????????????????????????
`;


const mapLines : string[] = map.split('\n').filter(x => x !== '');
console.log(mapLines);

const defaultEntries : GameMapTile[] = [];
for(let y = 0; y < GAMEMAP_TILES_AMOUNT_Y; y++) {
	const mapLine : string[] = mapLines[y].split('');

	for(let x = 0; x < GAMEMAP_TILES_AMOUNT_X; x++) {
		let tileType : TileType = TileType.Building_Slot;
		switch(mapLine[x]) {
			case 'B':
				tileType = TileType.Building;
				break;
			case 'P':
				tileType = TileType.Path;
				break;
			case 'T':
				tileType = TileType.Turret;
				break;
			case 'U':
				tileType = TileType.Turret_Slot;
				break;
			case '?':
				tileType = TileType.Unbuildable;
				break;
		}

		defaultEntries.push({
			x,
			y,
			tileType,
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