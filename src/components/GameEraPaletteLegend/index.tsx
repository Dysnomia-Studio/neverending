import Era from '../../models/Era.ts';

import View from './view.tsx';

export default function GameEraPaletteLegend({ era } : { era : Era }) {
	return (
		<View
			era={era}
		/>
	);
}
