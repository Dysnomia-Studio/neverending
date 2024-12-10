import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useHealthPoints() {
	const { healthPoints } = useContext(GlobalGameContext);

	return healthPoints;
}
