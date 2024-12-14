import { createRoot } from 'react-dom/client';

import Game from './pages/Game';

import GameWorldContextProvider from './contexts/GameWorldContext';

import './index.css';
import GlobalGameContextProvider from './contexts/GlobalGameContext';

createRoot(document.getElementById('root')!).render(
	<GlobalGameContextProvider>
		<GameWorldContextProvider>
			<Game />
		</GameWorldContextProvider>
	</GlobalGameContextProvider>,
)
