import { useContext } from 'react';

import { GlobalGameContext } from '../contexts/GlobalGameContext';

export default function useUserCredits() {
	const { credits } = useContext(GlobalGameContext);

	return credits;
}
