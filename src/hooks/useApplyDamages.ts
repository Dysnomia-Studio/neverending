import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useApplyDamages() {
	const contextData = useContext(GlobalGameContext);
	if(contextData === null) {
		return () => {};
	}

	return contextData.applyDamages;
}
