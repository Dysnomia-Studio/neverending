import {
	CanvasImage,
	Circle,
	Poly, 
	Rect,
} from 'canvas2d-wrapper';

import Enemy from '../../../models/Enemy';

const HP_PER_TILE = 20;

export default function ConvertEnemiesToCanvas2DElements(value: Enemy, tileSize: number) : (Circle | Rect | CanvasImage | Poly)[] {
	// TODO: make it 60fps

	const hpBarTotalWidth = value.maxHealth / HP_PER_TILE * tileSize
	const hpBarRedWidth = value.health / HP_PER_TILE * tileSize
	const hpBarHeight = tileSize / 5;

	return [
		new Circle({
			id: 'enemy-' + value.position.x + '-' + value.position.y,
			x: (value.position.x + 0.5) * tileSize,
			y: (value.position.y + 0.5) * tileSize,
			radius: tileSize * 0.4,
			fill: 'black',
			zIndex: 10
		}),
		new Rect({
			id: 'enemy-hp-' + value.position.x + '-' + value.position.y,
			x: (value.position.x + 0.5) * tileSize - hpBarTotalWidth / 2,
			y: value.position.y * tileSize - hpBarHeight * 1.5,
			fill: 'red',
			height: hpBarHeight,
			width: hpBarRedWidth,
			zIndex: 100
		}),
		new Rect({
			id: 'enemy-hplost-' + value.position.x + '-' + value.position.y,
			x: (value.position.x + 0.5) * tileSize - hpBarTotalWidth / 2 + hpBarRedWidth,
			y: value.position.y * tileSize - hpBarHeight * 1.5,
			fill: '#bbbbbb',
			height: hpBarHeight,
			width: hpBarTotalWidth - hpBarRedWidth,
			zIndex: 100
		})
	];
}