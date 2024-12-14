import { useContext } from 'react';

import { GameWorldContext } from '../contexts/GameWorldContext';

import Era from '../models/Era';
import Enemy from '../models/Enemy';

export default function useEnemies(era : Era) : Enemy[] | null {
	const data = useContext(GameWorldContext);
	if(data === null) {
		return null;
	}

	return data.enemies[era];
}
