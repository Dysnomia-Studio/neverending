import { createContext, useState } from 'react';

import GlobalGameContextModel, { DEFAULT_HP, DEFAULT_CREDITS } from '../models/GlobalGameContextModel';

export const GlobalGameContext = createContext<GlobalGameContextModel | null>(null)

export default function GlobalGameContextProvider({ children } : { children: React.ReactNode }) {
	const [healthPoints, setHealthPoints]  = useState<number>(DEFAULT_HP);
	const [credits, setCredits]  = useState<number>(DEFAULT_CREDITS);

	return (
		<GlobalGameContext.Provider value={{
			healthPoints,
			applyDamages: (amount) => setHealthPoints(hp => hp - amount),
			regenHealth: (amount) => setHealthPoints(hp => hp + amount),

			credits,
			spendCredits: (amount) => setCredits(credits => credits - amount),
			earnCredits: (amount) => setCredits(credits => credits + amount),
		}}>
			{children}
		</GlobalGameContext.Provider>
	);
}