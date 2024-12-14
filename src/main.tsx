import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import Router from './components/Router';

import GameWorldContextProvider from './contexts/GameWorldContext';
import GlobalGameContextProvider from './contexts/GlobalGameContext';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<GlobalGameContextProvider>
			<GameWorldContextProvider>
				<Router />
			</GameWorldContextProvider>
		</GlobalGameContextProvider>
	</BrowserRouter>,
)
