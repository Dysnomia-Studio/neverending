import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useUserCredits() {
	const contextData = useContext(GlobalGameContext);
	if(contextData === null) {
		return 0;
	}

	return contextData.credits;
}

