import Era from '../models/Era';
import GameMapTile, { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../models/GameMapTile';
import TileType from '../models/TileType';

const map = `
????????????????????????????????
????????????????????????????????
?.......???????????...........??
?UUUUUUU.?????????.UUUUUUUUUU.??
?UPPPPPU.?????????.UPPPPPPPP7H??
?UPU.UPUB.???????..UPU7777UP7H??
?UPU.UPU...........UPUGHHGUP8H??
?UPU.UPUUUUUUUUUUUUUPUHHHHUP8H??
?7PU.UPPPPPPPPPPPPPPPU8888UZZZ??
PPPUBUUUUUUUUUUUUUUUP333333ZZZ??
?7PU....UPPPPPPPPPPPP788887ZZZ??
?UPU....UPUUUUUUUUUU277777728H??
?UPUUUU.UPU....HHGG7277222728H??
?UPPPPU.UPU..????HG7277272727H??
?UUUUPUUUPU.??????G7222272227H??
?...UPPPPPU.??????G77777H7777H??
???.UUUUUUU.???????GGGHHHHHHHH??
????????????????????????????????
`;


const mapLines : string[] = map.split('\n').filter(x => x !== '');

export default function getDefaultMapForEra(era : string) {
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
				position: {
					x,
					y,
				},
				tileType,
				range: tileType === TileType.Turret ? 3 : 0, // TODO
				damages: tileType === TileType.Turret ? 1 : 0, // TODO
				targets: [],
			});
		}
	}

	return entries;
}
