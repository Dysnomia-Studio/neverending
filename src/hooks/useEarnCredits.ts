import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useEarnCredits() {
	const contextData = useContext(GlobalGameContext);
	if(contextData === null) {
		return 0;
	}

	return contextData.earnCredits;
}

