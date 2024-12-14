import { createContext, useState } from 'react';

import KilledEnnemiesStats from '../models/KilledEnnemiesStats';
import GlobalGameContextModel, { DEFAULT_HP, DEFAULT_CREDITS } from '../models/GlobalGameContextModel';
import EnemyType from '../models/EnemyType';

export const GlobalGameContext = createContext<GlobalGameContextModel | null>(null)

export default function GlobalGameContextProvider({ children } : { children: React.ReactNode }) {
	const [healthPoints, setHealthPoints]  = useState<number>(DEFAULT_HP);
	const [credits, setCredits] = useState<number>(DEFAULT_CREDITS);
	const [score, setScore] = useState<KilledEnnemiesStats>({});

	return (
		<GlobalGameContext.Provider value={{
			healthPoints,
			applyDamages: (amount) => setHealthPoints(hp => hp - amount),
			regenHealth: (amount) => setHealthPoints(hp => hp + amount),

			credits,
			spendCredits: (amount) => setCredits(credits => credits - amount),
			earnCredits: (amount) => setCredits(credits => credits + amount),

			score,
			addKilledEnemyToStats: (type: EnemyType) => {
				setScore((oldScore : KilledEnnemiesStats) => {
					if(!oldScore[type]) {
						oldScore[type] = 0;
					}

					oldScore[type]++;

					return JSON.parse(JSON.stringify(oldScore));
				});
			}
		}}>
			{children}
		</GlobalGameContext.Provider>
	);
}