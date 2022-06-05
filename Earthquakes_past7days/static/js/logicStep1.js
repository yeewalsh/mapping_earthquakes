// check to see if the code is working
console.log("working");

// Create the tilelayer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'satellite-streets-v11',
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Satellite": satelliteStreets,
    "Streets": streets
};

// Create a map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// pass the map layers into the control layer and pass the control layer onto the map
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let earthquakesLastWeek = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data
d3.json(earthquakesLastWeek).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJson(data)  // , {
    // onEachFeature: function(feature, layer) {
    //             console.log(layer),
                // layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name + ", " + feature.properties.country + "</h3>")
    // }})
    .addTo(map);
});

