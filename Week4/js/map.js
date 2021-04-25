// Global variables
let map;
let lat = 34.0522;
let lon = -118.2437;
let zl = 3;
let path = "data/Urban_Art_Locations.csv";
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
	readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){

	// loop through each entry
	data.data.forEach(function(item,index){
		// create a marker
		let marker = L.marker([item.latitude, item.longitude], {icon: greenIcon})
		.on('mouseover',function(){
			this.bindPopup(`${item.title}<br><img src="${item.thumbnail_url}" width=100px alt=" Image Not Provided in Data"><br>${item.artist_name}, ${item.installation_date}`).openPopup()
		})

		// add marker to featuregroup
		markers.addLayer(marker)

		// add entry to sidebar
		$('.sidebar').append(`<img src="${item.thumbnail_url}" width=100px onmouseover="panToImage(${index})">`)
	})

	// add featuregroup to map
	markers.addTo(map)

	// define layers
	let layers = {
    	"My Markers": markers
	}

// add layer control box
L.control.layers(null,layers).addTo(map)


	// fit map to markers
	map.fitBounds(markers.getBounds())
}

function panToImage(index){
	map.setZoom(17);
	map.panTo(markers.getLayers()[index]._latlng);
}

var LeafIcon = L.Icon.extend({
    options: {
       iconSize:     [40, 40],
       iconAnchor:   [15, 29],
       shadowAnchor: [1, 12],
       popupAnchor:  [-1, -20]
    }
});

var greenIcon = new LeafIcon({
    iconUrl: 'images/spraycan.png',
})

// Assumes your Leaflet map variable is 'map'..
L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');