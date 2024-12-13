import { Canvas2D, useWindowDimensions } from 'canvas2d-wrapper';
import { useEffect, useState } from 'react';

import useMapContent from '../../hooks/useMapContent';
import useApplyDamages from '../../hooks/useApplyDamages';

import GameEraInput from '../../models/GameEraInput';
import GameMapTile from '../../models/GameMapTile';

import Enemy from '../../models/Enemy';
import EnemyType from '../../models/EnemyType';
import { GAMEMAP_TILES_AMOUNT_X, GAMEMAP_TILES_AMOUNT_Y } from '../../models/GameMap';
import TileType from '../../models/TileType';

import ConvertTilesToCanvas2DElements from './gameEntitiesToCanvas/convertTilesToCanvas2DElements';
import ConvertEnemiesToCanvas2DElements from './gameEntitiesToCanvas/convertEnemiesToCanvas2DElements';

import './index.css';

function getPathAround(mapContent: GameMapTile[], x: number, y: number) : GameMapTile[] {
    return [
    	mapContent.find(t => t.position.x === x && t.position.y === y - 1),
    	mapContent.find(t => t.position.x === x && t.position.y === y + 1),
    	mapContent.find(t => t.position.x === x - 1 && t.position.y === y),
    	mapContent.find(t => t.position.x === x + 1 && t.position.y === y),
    ].filter(x => typeof x !== 'undefined').filter(x => x.tileType === TileType.Path);
}

function moveEnemies(currEnemies: Enemy[], mapContent : GameMapTile[], applyDamages: (amount: number) => void ): Enemy[] {
    const newEnemies = [];
    for(const enemy of currEnemies) {
    	const neighboors = getPathAround(mapContent, enemy.position.x, enemy.position.y);
    	const validNeighboors = neighboors.filter(n => n.position.x >= enemy.position.x && !enemy.visitedTiles.find(t => t.x === n.position.x && t.y === n.position.y));
    	if(validNeighboors.length === 0) { // We're at the base
    		applyDamages(enemy.damages);
    		continue;
    	}

    	// TODO: prevent NPC going down in Medieval map on (20,9)

    	const newPosition = validNeighboors[Math.round(Math.random() * (validNeighboors.length - 1))].position; 

    	enemy.visitedTiles.push({ ...enemy.position });
    	enemy.position.x = newPosition.x;
    	enemy.position.y = newPosition.y;

    	newEnemies.push(enemy);
    }

    return newEnemies;
}

export default function GameEra({ era } : GameEraInput) {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const { width, height } = useWindowDimensions();
	const mapContent = useMapContent(era);
	const applyDamages = useApplyDamages();

	const [enemies, setEnemies] = useState<Enemy[]>([{
		enemyType: EnemyType.Dark_Knight,
		position: { 
			x: 0,
			y: 9,
		},
		visitedTiles: [],
		damages: 1,
		health: Math.round(Math.random() * 10),
		maxHealth: 10
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
			id={era}
			className="game-view"
			
			height={canvasHeight}
			width={canvasWidth}
			deltaLeft={-1 * (canvasWidth / 2)}
			deltaTop={-1 * (canvasHeight / 2)}

			lockXAxis={true}
			lockYAxis={true}

			onClick={console.log}
			onFrame={() => {
				if(!mapContent?.content) {
					console.error('Error when reading mapContent !');
					return [];
				}

				const convertedMapContent = mapContent.content.map((element) => ConvertTilesToCanvas2DElements(element, tileSize, [hoveredId])).flat();
				const convertedEntities = enemies.map((entity) => ConvertEnemiesToCanvas2DElements(entity, tileSize)).flat();

				return [
					...convertedMapContent,
					...convertedEntities
				];
			}}
			onHover={(element) => setHoveredId(element.id)}
			onRightClick={console.log}
		/>
		<span className="era-name">{era.toUpperCase()}</span>
		</div>
	);
}



