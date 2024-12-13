import Era from '../../../models/Era';
import TileType from '../../../models/TileType';

const palettes = {
	[Era.Medieval]: {
		[TileType.Building]: '#944444',
		[TileType.Building_Slot]: '#F2D662',
		[TileType.Path]: '#80827F',
		[TileType.Player_Base]: '#566CD8',
		[TileType.Turret_Slot]: '#756235',
		[TileType.Turret]: '#423636',
		[TileType.Unbuildable]: '#9DB055',
	},
	[Era.Modern]: {
		[TileType.Building]: '#18bfc7',
		[TileType.Building_Slot]: '#656b65',
		[TileType.Path]: '#282927',
		[TileType.Player_Base]: '#e0342b',
		[TileType.Turret_Slot]: '#1d471e',
		[TileType.Turret]: '#a16006',
		[TileType.Unbuildable]: '#3d3927',
	},
	[Era.Future]: {
		[TileType.Building]: '#37EBF3',
		[TileType.Building_Slot]: '#136359',
		[TileType.Path]: '#272932',
		[TileType.Player_Base]: '#CB1DCD',
		[TileType.Turret_Slot]: '#D1C5C0',
		[TileType.Turret]: '#FDF500',
		[TileType.Unbuildable]: '#360d05',
	}	
};

export default palettes;
