import Era from '../../models/Era';

import palettes from '../GameEra/gameEntitiesToCanvas/colorPalettes';

import './index.css';

function toWord(key) {
	const cleanKey = key.replaceAll('_', ' ').trim();
	const firstLetter = cleanKey.substr(0, 1);
	const otherLetters = cleanKey.substr(1);

	return firstLetter.toUpperCase() + otherLetters;
}

export default function GameEraPaletteLegend({ era } : { era : Era }) {
	const currentPalette = palettes[era];

	return (
		<ul className="game-era-palette-legend">
			{Object.keys(currentPalette).map((k) => <li key={k}><span style={{color: currentPalette[k]}}>▩</span> {toWord(k)}</li>)}
		</ul>
	);
}



