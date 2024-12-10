import { createContext, useState } from 'react';

import GlobalGameContextModel, { DEFAULT_HP } from '../models/GlobalGameContextModel';

export const GlobalGameContext = createContext<GlobalGameContextModel | null>(null)

export default function GlobalGameContextProvider({ children } : { children: React.ReactNode }) {
	const [healthPoints, setHealthPoints]  = useState<number>(DEFAULT_HP);

	return (
		<GlobalGameContext.Provider value={{
			healthPoints,
			applyDamages: (amount) => setHealthPoints(hp => hp - amount),
			regenHealth: (amount) => setHealthPoints(hp => hp + amount),
		}}>
			{children}
		</GlobalGameContext.Provider>
	);
}