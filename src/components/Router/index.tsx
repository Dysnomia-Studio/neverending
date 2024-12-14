import { Routes, Route } from 'react-router';

import Credits from '../../pages/Credits';
import Game from '../../pages/Game';
import Menu from '../../pages/Menu';

export default function Router() {
	return (
		<Routes>
			<Route index element={<Menu />} />
			<Route path="game" element={<Game />} />
			<Route path="credits" element={<Credits />} />
		</Routes>
	);
}
