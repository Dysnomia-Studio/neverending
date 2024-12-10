import { createContext, useEffect, useState } from 'react';

import Era from '../models/Era';
import GameMap, { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../models/GameMap';
import GameMapTile from '../models/GameMapTile';
import TileType from '../models/TileType';

export const GameMapContext = createContext<GameMap[]>([]);

const map = `
????????????????????????????????
????????????????????????????????
?.......???????????...........??
?UUUUUUU.?????????.UUUUUUUUUU.??
?UPPPPPT.?????????.UPPPPPPPP7H??
?UPU.UPUB.???????..UPU.GG.UP7H??
?UPU.UPU...........UPUGHHGUP8H??
?UPU.UPTUUUUUUUUUUUUPUHHHHUP8H??
?7PT.UPPPPPPPPPPPPPPPU8888UZZZ??
PPPUBUUUUUUUUUUUUUUUP333333ZZZ??
?7PU....UPPPPPPPPPPPP788887ZZZ??
?UPU....UPUUUUUUUUUU277777728H??
?UPTUUU.UPU....HHGG7277222728H??
?UPPPPU.UPU..????HG7277272727H??
?UUUUPUTUPU.??????G7222272227H??
?...UPPPPPU.??????G77777H7777H??
???.UUUUUUU.???????GGGHHHHHHHH??
????????????????????????????????
`;


const mapLines : string[] = map.split('\n').filter(x => x !== '');
console.log(mapLines);

function getMapForEra(era : Era) {
	const entries : GameMapTile[] = [];
	for(let y = 0; y < GAMEMAP_TILES_AMOUNT_Y; y++) {
		const mapLine : string[] = mapLines[y].split('');

		for(let x = 0; x < GAMEMAP_TILES_AMOUNT_X; x++) {
			let tileType : TileType = TileType.Unbuildable;
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
				case 'Z':
					tileType = TileType.Player_Base;
					break;
				case '.':
					tileType = TileType.Building_Slot;
					break;

				// Era-specific thingies
				case 'G':
					if(era !== Era.Medieval) {
						tileType = TileType.Building_Slot;
					}
					break;
				case 'H':
					if(era === Era.Future) {
						tileType = TileType.Building_Slot;
					}
					break;
				case '2':
					if(era !== Era.Medieval) {
						tileType = TileType.Path;
					}
					break;
				case '3':
					if(era === Era.Future) {
						tileType = TileType.Path;
					}
					break;
				case '7':
					if(era !== Era.Medieval) {
						tileType = TileType.Turret_Slot;
					}
					break;
				case '8':
					if(era === Era.Future) {
						tileType = TileType.Turret_Slot;
					}
					break;
				case '?':
					tileType = TileType.Unbuildable;
					break;
			}

			entries.push({
				x,
				y,
				tileType,
			});
		}
	}

	return entries;
}

export default function GameMapContextProvider({ children } : { children: React.ReactNode }) {
	const [gameMapsContent, setGameMapContent]  = useState<GameMap[]>([]);

	useEffect(() => {
		setGameMapContent([{
			era: Era.Medieval,
			content: getMapForEra(Era.Medieval),
		}, {
			era: Era.Modern,
			content: getMapForEra(Era.Modern),
		}, {
			era: Era.Future,
			content: getMapForEra(Era.Future),
		}])
	}, []);

	return (
		<GameMapContext.Provider value={gameMapsContent}>
			{children}
		</GameMapContext.Provider>
	);
}