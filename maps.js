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
	
	document.getElementById('add-row-north').addEventListener('click', AddRowNorth);
	document.getElementById('minus-row-north').addEventListener('click', MinusRowNorth);
	document.getElementById('add-row-south').addEventListener('click', AddRowSouth);
	document.getElementById('minus-row-south').addEventListener('click', MinusRowSouth);
	document.getElementById('add-row-east').addEventListener('click', AddRowEast);
	document.getElementById('minus-row-east').addEventListener('click', MinusRowEast);
	document.getElementById('add-row-west').addEventListener('click', AddRowWest);
	document.getElementById('minus-row-west').addEventListener('click', MinusRowWest);
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

function AddRowNorth(event) {
	mapArray.unshift([]);
	for(let x=0; x<mapArray[1].length; x++)
	{
		mapArray[0].push(BLANK);
	}
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function MinusRowNorth(event) {
	if(GetMapTileHeight() <= initialMapDimension) {
		return;
	}
	mapArray.shift();
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function AddRowSouth(event) {
	mapArray.push([]);
	let y = GetMapTileHeight() - 1;
	for(let x=0; x<mapArray[0].length; x++)
	{
		mapArray[y].push(BLANK);
	}
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function MinusRowSouth(event) {
	if(GetMapTileHeight() <= initialMapDimension) {
		return;
	}
	mapArray.pop();
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function AddRowWest(event) {
	for(let y=0; y<GetMapTileHeight(); y++)
	{
		mapArray[y].unshift(BLANK);
	}
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function MinusRowWest(event) {
	if(GetMapTileWidth() <= initialMapDimension) {
		return;
	}
	for(let y=0; y<GetMapTileHeight(); y++)
	{
		mapArray[y].shift();
	}
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function AddRowEast(event) {
	for(let y=0; y<GetMapTileHeight(); y++)
	{
		mapArray[y].push(BLANK);
	}
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function MinusRowEast(event) {
	if(GetMapTileWidth() <= initialMapDimension) {
		return;
	}
	for(let y=0; y<GetMapTileHeight(); y++)
	{
		mapArray[y].pop();
	}
	SetCanvasSize();
	DrawMap();
	
	return false;
}

function SetCanvasSize() {
	let width = GetMapTileWidth() * pixelsPerTile;
	let height = GetMapTileHeight() * pixelsPerTile;
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
}

function GetMapTileWidth() {
	return mapArray[0].length;
}

function GetMapTileHeight() {
	return mapArray.length;
}
