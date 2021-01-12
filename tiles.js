//load tile options

const versions = {
	v1: "v1",
	adventure_map: "adventure_map"
};

const v1_filenames = [
	"grass.png",
	"floor.png",
	"wall.png",
	"door-ns.png",
	"door-we.png",
	"stairs-ne-sw.png",
	"stairs-nw-se.png",
	"floor-n-wall.png",
	"floor-n-open.png",
	"floor-n-door.png",
	"floor-e-wall.png",
	"floor-e-open.png",
	"floor-e-door.png",
	"floor-s-wall.png",
	"floor-s-open.png",
	"floor-s-door.png",
	"floor-w-wall.png",
	"floor-w-open.png",
	"floor-w-door.png",
	"floor-ne-wall.png",
	"floor-ne-open.png",
	"floor-ne-door.png",
	"floor-se-wall.png",
	"floor-se-open.png",
	"floor-se-door.png",
	"floor-sw-wall.png",
	"floor-sw-open.png",
	"floor-sw-door.png",
	"floor-nw-wall.png",
	"floor-nw-open.png",
	"floor-nw-door.png",
	"floor-n-wall-e-open.png",
	"floor-n-wall-w-open.png",
	"floor-n-wall-e-door.png",
	"floor-n-wall-w-door.png",
	"floor-n-open-e-wall.png",
	"floor-n-open-w-wall.png",
	"floor-n-door-e-wall.png",
	"floor-n-door-w-wall.png",
	"floor-s-wall-e-open.png",
	"floor-s-wall-w-open.png",
	"floor-s-wall-e-door.png",
	"floor-s-wall-w-door.png",
	"floor-s-open-e-wall.png",
	"floor-s-open-w-wall.png",
	"floor-s-door-e-wall.png",
	"floor-s-door-w-wall.png",
];

const adventure_map_filenames = [
	"plain.png",
	"fields.png",
	"forest.png",
	"mountains.png",
	"lake.png",
	"river-ns.png"
];

var selectedTile = {};

function InitTilesContainer(container, version) {
	let filenames = v1_filenames;
	if(version == versions.adventure_map)
		filenames = adventure_map_filenames;
	container.innerHTML = "";
	filenames.forEach(filename => {
		let img = document.createElement('img');
		img.src = "tiles/" + version + "/" + filename;
		img.classList.add('tile');
		
		let wrapper = document.createElement('div');
		wrapper.classList.add('tile-wrapper');
		wrapper.dataset.version = version;
		wrapper.dataset.fileName = filename;
		wrapper.addEventListener('click', SelectTile);
		wrapper.appendChild(img);
		
		container.appendChild(wrapper);
	});
	
	container.children[0].click();
}

function SelectTile(event) {
	let element = event.target;
	if(element.tagName.toLowerCase() == 'img')
		element = element.parentElement;
		
	DeselectTiles();
	selectedTile = {
		version: element.dataset.version,
		fileName: element.dataset.fileName
	};
	element.classList.add('selected');
	
	return false;
}

function DeselectTiles() {
	const tiles = document.getElementsByClassName('tile-wrapper');
	for(let i=0; i<tiles.length; i++)
	{
		tiles[i].classList.remove('selected');
	}
}
