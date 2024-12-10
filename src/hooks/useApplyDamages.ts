import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useApplyDamages() {
	const { applyDamages } = useContext(GlobalGameContext);

	return applyDamages;
}
