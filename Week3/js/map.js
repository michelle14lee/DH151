var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var map = L.map('map').setView([49.1391,-102.9915], 3.33);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let data = [
    {
        'title':'Boston',
        'time': ': Last travelled here in Summer 2017.',
        'description': 'As we were travelling to our hotel, we came across several blocks of brick houses. It was definitely an unusual sight, coming from California where we are prone to earthquakes.',
        'image': 'images/boston.png',
        'lat': 42.3601,
        'lon': -71.0589
    },
    {
        'title':'New York City',
        'time': ': Last travelled here in Summer 2017.',
        'description': 'Our last destination before boarding the flight home was to a popular pizza place called 2 Bros Pizza. Nothing beats $1 slices of thin crust pizza!',
        'image': 'images/newyork.png',
        'lat': 40.7128,
        'lon': -74.0060
    },
    {
        'title':'Chicago',
        'time': ': Last travelled here in Summer 2018.',
        'description': 'We did a lot of walking this day, and I really enjoyed strolling down the Chicago Riverwalk in the evening. On this day, I logged over 26,000 steps!',
        'image': 'images/chicago.JPG',
        'lat': 41.8781,
        'lon': -87.6298
    },
    {
        'title':'Honolulu',
        'time': ': Last travelled here in Summer 2019.',
        'description': 'The mountain in the background is actually the Diamond Head Crater, one of the most famuos hiking spots in Oahu.',
        'image': 'images/hawaii.JPG',
        'lat': 21.3069,
        'lon': -157.8583
    },
    {
        'title':'Los Angeles',
        'time': ': Last travelled here in March 2020.',
        'description': 'It is crazy that I have not been back to UCLA in more than a year. A typical night-time activity to do with friends was to go to Pizookie Tuesdays at BJs. I hope to come back soon...',
        'image': 'images/losangeles.png',
        'lat': 34.0522,
        'lon': -118.2437
    }
]

let myMarkers = L.featureGroup();


data.forEach(function(item,index){
    var marker = L.marker([item.lat,item.lon], {icon: greenIcon})
        .bindPopup(`<div>${item.title}${item.time}</div>`)
    myMarkers.addLayer(marker)

    $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})"><div><b>${item.title}</b></div><img src="${item.image}" width=70% height=70%><br>${item.description}</div>`)
});

myMarkers.addTo(map)

// define layers
let layers = {
    "My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

map.fitRounds(myMarkers.getRounds())

function flyToIndex(index){
    map.flyTo([data[index].lat, data[index].lon],12)
}

