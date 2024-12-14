import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useAddKilledEnemyToStats() {
	const contextData = useContext(GlobalGameContext);
	if(contextData === null) {
		return null;
	}

	return contextData.addKilledEnemyToStats;
}
