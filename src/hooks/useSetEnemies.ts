import { useContext } from 'react';

import { GameWorldContext } from '../contexts/GameWorldContext';

export default function useSetEnemies() {
	const data = useContext(GameWorldContext);
	if(data === null) {
		return null;
	}

	return data.setEnemies;
}
