var map = L.map('map').setView([37.850033,-113.6500523], 3.33);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let data = [
    {
        'title':'Chicago',
        'description': 'Last travelled here in Summer 2018. I really enjoyed walking the Chicago Riverwalk during the evening.',
        'lat': 41.8781,
        'lon': -87.6298
    },
    {
        'title':'Los Angeles',
        'description': 'Last travelled here in March 2020. It is crazy that I have not been back to UCLA in more than a year. I hope I will come back soon...',
        'lat': 34.0522,
        'lon': -118.2437
    },
    {
        'title':'New York City',
        'description': 'Last travelled here in Summer 2017. Nothing beats $1 slices of thin crust pizza!',
        'lat': 40.7128,
        'lon': -74.0060
    },
    {
        'title':'Boston',
        'description': 'Last travelled here in Summer 2017. I did not realize how many colleges were in the area and how close they were.',
        'lat': 42.3601,
        'lon': -71.0589
    },
    {
        'title':'Honolulu',
        'description': 'Last travelled here in Summer 2019. It was so lush and beautiful; I really want to go back someday.',
        'lat': 21.3069,
        'lon': -157.8583
    }
]

let myMarkers = L.featureGroup();


data.forEach(function(item,index){
    var marker = L.marker([item.lat,item.lon])
        .bindPopup(`<div>${item.title}</div><img src="${item.image}" width=100%><br>${item.description}`)
    myMarkers.addLayer(marker)

    $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`)
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