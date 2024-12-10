import { Canvas2D, useWindowDimensions, Circle, Rect } from 'canvas2d-wrapper';

import useMapContent from '../../hooks/useMapContent';

import GameEraInput from '../../models/GameEraInput';
import GameMapTile from '../../models/GameMapTile';

import './index.css';
import { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../../models/GameMap';
import TileType from '../../models/TileType';
import Enemy from '../../models/Enemy';
import EnemyType from '../../models/EnemyType';
import { useEffect, useState } from 'react';
import useApplyDamages from '../../hooks/useApplyDamages';

function ConvertTilesToCanvas2DElements(value: GameMapTile, tileSize: number) : Rect {
	let color : string = '#666666';
	switch(value.tileType) {
		case TileType.Building:
			color = '#006666';
			break;
		case TileType.Path:
			color = '#4d004d';
			break;
		case TileType.Player_Base:
			color = '#FF0000';
			break;
		case TileType.Turret_Slot:
			color = '#777777';
			break;
		case TileType.Turret:
			color = '#222222';
			break;
		case TileType.Unbuildable:
			color = '#006600';
			break;
	}

	return new Rect({
		id: value.x + '-' + value.y,
		x: value.x * tileSize,
		y: value.y * tileSize,
		fill: color,
		height: tileSize,
		width: tileSize
	});
}

function ConvertEntitiesToCanvas2DElements(value: any, tileSize: number) : Circle {
	// TODO: make it 60fps

	return new Circle({
		id: 'ent-' + value.x + '-' + value.y,
		x: (value.x + 0.5) * tileSize,
		y: (value.y + 0.5) * tileSize,
		radius: tileSize * 0.4,
		fill: 'black',
		zIndex: 10
	});
}

function getPathAround(mapContent: GameMapTile[], x: number, y: number) : GameMapTile[] {
    return [
    	mapContent.find(t => t.x === x && t.y === y - 1),
    	mapContent.find(t => t.x === x && t.y === y + 1),
    	mapContent.find(t => t.x === x - 1 && t.y === y),
    	mapContent.find(t => t.x === x + 1 && t.y === y),
    ].filter(x => typeof x !== 'undefined').filter(x => x.tileType === TileType.Path);
}

function moveEnemies(currEnemies: Enemy[], mapContent : GameMapTile[], applyDamages: (amount: number) => void ): Enemy[] {
    const newEnemies = [];
    for(const enemy of currEnemies) {
    	const neighboors = getPathAround(mapContent, enemy.x, enemy.y);
    	const validNeighboors = neighboors.filter(n => n.x >= enemy.x && !enemy.visitedTiles.find(t => t.x === n.x && t.y === n.y));
    	if(validNeighboors.length === 0) { // We're at the base
    		applyDamages(enemy.damages);
    		continue;
    	}

    	// TODO: prevent NPC going down in Medieval map on (20,9)

    	const newPosition = validNeighboors[Math.round(Math.random() * (validNeighboors.length - 1))]; 

    	enemy.visitedTiles.push({ x: enemy.x, y: enemy.y });
    	enemy.x = newPosition.x;
    	enemy.y = newPosition.y;

    	newEnemies.push(enemy);
    }

    return newEnemies;
}


export default function GameEra({ era } : GameEraInput) {
	const { width, height } = useWindowDimensions();
	const mapContent = useMapContent(era);
	const applyDamages = useApplyDamages();

	const [enemies, setEnemies] = useState<Enemy[]>([{
		enemyType: EnemyType.Dark_Knight,
		x: 0,
		y: 9,
		visitedTiles: [],
		damages: 1
	}]);

	useEffect(() => {
		if(!mapContent?.content) {
			return;
		}

		const intervalId = setInterval(() => {
			setEnemies((currEnemies) => moveEnemies(currEnemies, mapContent.content, applyDamages));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [mapContent]);

	const canvasWidth = width / 3;
	const tileSize = canvasWidth / GAMEMAP_TILES_AMOUNT_X;
	const canvasHeight = tileSize * GAMEMAP_TILES_AMOUNT_Y;

	return (
		<div className={`game-view-parent ${era}`}>
		<Canvas2D
			className="game-view"
			
			height={canvasHeight}
			width={canvasWidth}
			deltaLeft={-1 * (canvasWidth / 2)}
			deltaTop={-1 * (canvasHeight / 2)}

			lockXAxis={true}
			lockYAxis={true}

			onClick={() => []}
			onFrame={() => {
				if(!mapContent?.content) {
					console.error('Error when reading mapContent !');
					return [];
				}

				const convertedMapContent = mapContent.content.map((element) => ConvertTilesToCanvas2DElements(element, tileSize));
				const convertedEntities = enemies.map((entity) => ConvertEntitiesToCanvas2DElements(entity, tileSize));

				return [
					...convertedMapContent,
					...convertedEntities
				];
			}}
			onHover={() => []}
			onRightClick={() => []}
		/>
		<span className="era-name">{era.toUpperCase()}</span>
		</div>
	);
}



