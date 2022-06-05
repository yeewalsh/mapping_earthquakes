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
    .addTo(map);
});

