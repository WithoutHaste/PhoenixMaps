// Map creation operations

var pixelsPerTile = 70;
var mapTileWidth = 8;
var mapTileHeight = 8;
var canvas = null;
var context = null;

function InitMapContainer(container) {
	container.innerHTML = "";
	
	canvas = document.createElement('canvas');
	SetCanvasSize();	
	canvas.addEventListener('click', PlaceTile);
	context = canvas.getContext('2d');
	
	container.appendChild(canvas);
}

function PlaceTile(event) {
	console.log(event);
}

function SetCanvasSize() {
	canvas.style.width = (mapTileWidth * pixelsPerTile) + 'px';
	canvas.style.height = (mapTileHeight * pixelsPerTile) + 'px';
}
