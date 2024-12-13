import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useHealthPoints() {
	const contextData = useContext(GlobalGameContext);
	if(contextData === null) {
		return 0;
	}

	return contextData.healthPoints;
}
