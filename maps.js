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
	
	let fileImport = document.getElementById('file-import');
	fileImport.addEventListener('change', ImportNix);
	document.getElementById('import-nix').addEventListener('click', function(event) { fileImport.click(); });
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
	GeneratePng();
	GenerateNix();
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

function GeneratePng() {
	canvas.toBlob(FinishGeneratePng, 'image/png');
	
	function FinishGeneratePng(blob) {
		let url = URL.createObjectURL(blob);
		document.getElementById('export-png').href = url;
	}
}

function StripExtension(text) {
	return text.split('.')[0];
}

function GenerateNix() {
	let tiles = "";
	for(let y=0; y<GetMapTileHeight(); y++)
	{
		for(let x=0; x<GetMapTileWidth(); x++)
		{
			let separator = (x < GetMapTileWidth() - 1) ? "," : "";
			if(mapArray[y][x] == BLANK) {
				tiles += separator;
			}
			else {
				tiles += StripExtension(mapArray[y][x]) + separator;
			}
		}
		tiles += "\n";
	}
	
	let contents = ["VERSION", "\n", selectedTile.version, "\n\n", "TILES", "\n", tiles];
	let blob = new Blob(contents, {type : 'text/nix'});	
	let url = URL.createObjectURL(blob);
	document.getElementById('export-nix').href = url;
}

function ImportNix(event) {
	let file = event.target.files[0];
	let reader = new FileReader();
	reader.readAsText(file);
	reader.onerror = function() {
		console.log(reader.error);
	};
	reader.onload = ParseNix;
	
	function ParseNix() {
		let fullText = reader.result;
		let lines = fullText.split('\n');
		let index = 0;
		
		if(lines[index] != 'VERSION') {
			DisplayParseNixError("'VERSION' expected at first line");
			return;
		}
		index++;
		//TODO handle multiple versions
		index++;
		while(lines[index] == "" && index < lines.length)
			index++;
		
		if(lines[index] != 'TILES') {
			DisplayParseNixError("'TILES' expected after 'VERSION'");
			return;
		}
		index++;
		
		InitMap();
		let y = 0;
		while(lines[index] != '' && lines[index] != 'LABELS' && index < lines.length)
		{
			if(y >= mapArray.length) {
				mapArray.push([]);
			}
			let tiles = lines[index].split(',');
			for(let x=0; x<tiles.length; x++) {
				if(x >= mapArray[y].length) {
					mapArray[y].push(BLANK);
				}
				let tile = tiles[x];
				if(tile == "") {
					mapArray[y][x] = BLANK;
				}
				else {
					mapArray[y][x] = tile + ".png";
				}
			}
			index++;
			y++;
		}	

		SetCanvasSize();
		DrawMap();
	}
	
	function DisplayParseNixError(error) {
		console.log("Error parsing NIX: " + error);
	}
}