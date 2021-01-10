// Map creation operations

const BLANK = 'blank';

var initialMapDimension = 8;
var pixelsPerTile = 70;
var mapArray = [];
var canvas = null;
var context = null;

function InitMap() {
	mapArray = [];
	for(let y=0; y<initialMapDimension; y++)
	{
		mapArray.push([]);
		for(let x=0; x<initialMapDimension; x++)
		{
			mapArray[y].push(BLANK);
		}
	}
}

function InitMapContainer(container) {
	InitMap();
	
	container.innerHTML = "";
	
	canvas = document.createElement('canvas');
	SetCanvasSize();	
	canvas.addEventListener('click', PlaceTile);
	context = canvas.getContext('2d');
	container.appendChild(canvas);
}

function DrawMap() {
	const blankTile = document.getElementById(BLANK);
	for(let y=0; y<mapArray.length; y++)
	{
		for(let x=0; x<mapArray[y].length; x++)
		{
			if(mapArray[y][x] == BLANK)
			{
				context.drawImage(blankTile, x * pixelsPerTile, y * pixelsPerTile, pixelsPerTile, pixelsPerTile);
			}
			else
			{
				let tile = document.querySelectorAll('.tile-wrapper[data-file-name="' + mapArray[y][x] + '"]')[0].children[0];
				context.drawImage(tile, x * pixelsPerTile, y * pixelsPerTile, pixelsPerTile, pixelsPerTile);
			}
		}
	}
}

function PlaceTile(event) {
	let x = Math.floor(event.offsetX / pixelsPerTile);
	let y = Math.floor(event.offsetY / pixelsPerTile);
	mapArray[y][x] = selectedTile.fileName;
	
	DrawMap();
}

function SetCanvasSize() {
	canvas.setAttribute('width', (GetMapTileWidth() * pixelsPerTile));
	canvas.setAttribute('height', (GetMapTileHeight() * pixelsPerTile));
}

function GetMapTileWidth() {
	return mapArray[0].length;
}

function GetMapTileHeight() {
	return mapArray.length;
}
