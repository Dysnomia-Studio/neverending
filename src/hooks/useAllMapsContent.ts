import { useContext } from 'react';

import { GameWorldContext } from '../contexts/GameWorldContext';

export default function useAllMapsContent() {
	const data = useContext(GameWorldContext);
	if(data === null) {
		return null;
	}

	return data.maps;
}
