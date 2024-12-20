import { useContext } from 'react';

import { GameWorldContext } from '../contexts/GameWorldContext';

import Era from '../models/Era';
import GameMapTile from '../models/GameMapTile';

export default function useMapContent(era : Era) : GameMapTile[] | null {
	const data = useContext(GameWorldContext);
	if(data === null) {
		return null;
	}

	return data.maps[era];
}
