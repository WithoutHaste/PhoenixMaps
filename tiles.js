//load tile options

const version = {
	v1: "v1"
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

function InitTilesContainer(container, version) {
	let filenames = v1_filenames;
	container.innerHTML = "";
	filenames.forEach(filename => {
		let img = document.createElement('img');
		img.src = "tiles/" + version + "/" + filename;
		img.classList.add('tile');
		
		let wrapper = document.createElement('div');
		wrapper.classList.add('tile-wrapper');
		wrapper.appendChild(img);
		
		container.appendChild(wrapper);
	});
}
