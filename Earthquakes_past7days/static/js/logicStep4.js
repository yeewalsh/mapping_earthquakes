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

// Create the earthquake layer for our map
let earthquakes = new L.layerGroup();

// Define an object for the overlays, this overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};


// Create a map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});


// pass the map layers into the control layer and pass the control layer onto the map
L.control.layers(baseMaps, overlays).addTo(map);


// Accessing the airport GeoJSON URL
let earthquakesLastWeek = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create a function to return the style data for each of the earthquakes. 
function styleInfo(feature) {
    return{
        opacity: 1,
        fillOpacity: 1, 
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true, 
        weight: 0.5
    };
}

// Create a function to assign color based on the magnitude:
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea882c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
};

//Pass in the magnitude of the earthquake to calculate the radius:
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Grabbing our GeoJSON data
d3.json(earthquakesLastWeek).then(function(data) {
    // creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        // Turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            // console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        // Create a popup for each circleMarker to display magnitude and location
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    })
    .addTo(earthquakes);

    // Then add the earthquake layer to the map
    earthquakes.addTo(map);
});



// Older code from "Mapping_Multiple_Points"

// add console log to check code working
// console.log("working");

// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);


// // add a circle to the map
// let circleMarker = L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: "black",
//     fillOpacity: 0.2,
//     fillColor: '#ffffa1'
// }).addTo(map);


// // get data from cities.js
// let cityData = cities;
// console.log(cityData);

// // loop through cities array and create one marker for each city
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/100000,
//         color: "orange",
//         lineweight: 4
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });


// Coordinates for each point to be used in the line
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

// let line = [
//         [37.6371, -122.3885],
//         [30.2022, -97.6666],
//         [43.6863, -79.6218],
//         [40.6413, -73.7781]
//     ];

// // Crate a polyline using the line coordinates and make it red
// L.polyline(line, {
//     color: "blue",
//     dashArray: '5,5',
//     dashOffset: '5'
// }).addTo(map);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing GeoJSON data
// L.geoJSON(sanFranAirport, {
//     // turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
// }).addTo(map);

// // Grabbing GeoJSON data
// L.geoJson(sanFranAirport, {
//     // turn each feature into a marker on the map
//     onEachFeature: function(feature, layer) {
//         console.log(layer),
//         layer.bindPopup()
//         // return L.marker(latlng)
//         .bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name + ", " + feature.properties.country + "</h3>");
//     }
// }).addTo(map);
