import { Link } from 'react-router';

import './index.css';

export default function Credits() {
	return (
		<div className="credits">
			<h1>Credits</h1>
			<Link to="/">↩ Back to menu</Link>

			<ul className="credits-main-list">
				<li>Developer: Axel "Elanis" Soupé</li>
				<li>Joke Teller: Axel "Elanis" Soupé</li>
				<li>Credits by: Axel "Elanis" Soupé</li>
				<li>&nbsp;</li>
				<li>Fonts:
					<ul className="credits-fonts-list">
						<li className="modern">Domine, Designed by Impallari Type <a href="https://fonts.google.com/specimen/Domine/license" target="_blank" rel="noopener noreferrer">LICENSE</a></li>
						<li className="medieval">MedievalSharp, Designed by Wojciech Kalinowski <a href="https://fonts.google.com/specimen/MedievalSharp/license" target="_blank" rel="noopener noreferrer">LICENSE</a></li>
						<li>Roboto, Designed by Christian Robertson <a href="https://fonts.google.com/specimen/Roboto/license" target="_blank" rel="noopener noreferrer">LICENSE</a></li>
						<li className="future">Tektur, Designed by Adam Jagosz <a href="https://fonts.google.com/specimen/Tektur/license" target="_blank" rel="noopener noreferrer">LICENSE</a></li>
					</ul>
				</li>
			</ul>
		</div>
	);
}