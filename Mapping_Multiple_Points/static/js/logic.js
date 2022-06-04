// add console log to check code working
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Create the tilelayer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 4,
    id: 'satellite-streets-v11',
    accessToken: API_KEY
});

// Add the 'graymap' tile layer to the map.
streets.addTo(map);

// // add a circle to the map
// let circleMarker = L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: "black",
//     fillOpacity: 0.2,
//     fillColor: '#ffffa1'
// }).addTo(map);


// get data from cities.js
let cityData = cities;
console.log(cityData);

// loop through cities array and create one marker for each city
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/100000,
        color: "orange",
        lineweight: 4
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});


// Coordinates for each point to be used in the line
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

let line = [
        [37.6371, -122.3885],
        [30.2022, -97.6666],
        [43.6863, -79.6218],
        [40.6413, -73.7781]
    ];

// Crate a polyline using the line coordinates and make it red
L.polyline(line, {
    color: "blue",
    dashArray: '5,5',
    dashOffset: '5'
}).addTo(map);
