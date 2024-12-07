import { useContext } from 'react';

import { GameMapContext } from '../contexts/GameMapContext';

import Era from '../models/Era';

export default function useMapContent(era : Era) {
	const maps = useContext(GameMapContext);

	return maps.find((map) => map.era === era);
}
