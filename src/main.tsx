import { createRoot } from 'react-dom/client';

import Game from './pages/Game';

import GameMapContextProvider from './contexts/GameMapContext';

import './index.css';
import GlobalGameContextProvider from './contexts/GlobalGameContext';

createRoot(document.getElementById('root')!).render(
	<GlobalGameContextProvider>
		<GameMapContextProvider>
			<Game />
		</GameMapContextProvider>
	</GlobalGameContextProvider>,
)
