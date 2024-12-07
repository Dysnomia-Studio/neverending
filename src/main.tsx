import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Game from './pages/Game';

import GameMapContextProvider from './contexts/GameMapContext';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GameMapContextProvider>
			<Game />
		</GameMapContextProvider>
	</StrictMode>,
)
