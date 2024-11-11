// Declare map
let map;

function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let worldmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "World Map": worldmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    map = L.map("map-id", {
      center: [53, -115],
      zoom: 3.5,
      layers: [worldmap, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  
    // Create the legend
    createLegend();
}

function createMarkers(response) {

    // If de-bugging is needed, use the below commented out code.
    // Check if response.features exists and is an array
//    if (!response.features || !Array.isArray(response.features)) {
//        console.error('No features found in response.');
//        return;  // Exit early if no features are found
//    }

    // Initialize an array to hold earthquake markers.
    let quakeMarkers = [];

    // Create a markerSize() function to change the radius of each earthquake marker based on magnitude
    function markerSize(mag) {
        return mag * 23000; // Adjust size multiplier for visual clarity
    }

    // A function to determine fillColor based on earthquake depth
    function getColor(depth) {
        return depth > 90 ? 'darkred' :
               depth > 70 ? 'orangered' :
               depth > 50 ? 'orange' :
               depth > 30 ? 'yellow' :
               depth > 10 ? 'yellowgreen' :
                            'lightgreen';
    }

    // Loop through the features array in the GeoJSON response.
    for (let index = 0; index < response.features.length; index++) {
        let quake = response.features[index];  // Each earthquake feature
        
        // Ensure the quake object is defined
        if (!quake || !quake.geometry || !quake.properties) {
            console.warn(`Skipping invalid feature at index ${index}`, quake);
            continue;  // Skip this feature if it's missing required properties
        }

        let coords = quake.geometry.coordinates;  // Coordinates: [longitude, latitude, depth]
        let depth = quake.geometry.coordinates[2];

        // Extract necessary properties
        let title = quake.properties.title;
        let mag = quake.properties.mag;
        let place = quake.properties.place;
        let felt = quake.properties.felt;  // Might be null for some earthquakes

        // Create a circle marker for each earthquake
        let quakeMarker = L.circle([coords[1], coords[0]], {
            color: "grey",
            fillColor: getColor(depth),
            fillOpacity: 0.85,
            radius: markerSize(mag)
        }).bindPopup(`
            <h3>${title}</h3>
            <h4>Magnitude: ${mag}</h4>
            <h4>Location: ${place}</h4>
            <h4>Felt: ${felt !== null ? felt : 'No data'}</h4>
        `);

        // Push the marker to the quakeMarkers array
        quakeMarkers.push(quakeMarker);
    }

    // Create a layer group from the quakeMarkers array, and pass it to the createMap function.
    createMap(L.layerGroup(quakeMarkers));
}

// Set up the legend inside createMap function after the map is created
function createLegend() {
    // Create a legend control and specify its position on the map
    let legend = L.control({ position: "bottomright" });

    // Define the HTML content for the legend
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depthRanges = [
            { range: "> 90 km", color: "darkred" },
            { range: "> 70 km", color: "orangered" }, 
            { range: "> 50 km", color: "orange" }, 
            { range: "> 30 km", color: "yellow" },
            { range: "> 10 km", color: "yellowgreen" }, 
            { range: "≤ 10 km", color: "lightgreen" } 
        ];

        // Loop through the depth ranges and add them to the legend
        for (let i = 0; i < depthRanges.length; i++) {
            div.innerHTML +=
                `<i style="background:${depthRanges[i].color}"></i> ${depthRanges[i].range}<br>`;
        }

        return div;
    };

    // Add the legend to the map
    legend.addTo(map);
}

// Perform a call to the GeoJSON to get the earthquake information and call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
    .then(createMarkers)
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });
