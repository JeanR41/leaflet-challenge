# Module 15 Challenge: leaflet-challenge

## Project Overview
This project visualizes earthquake data using the Leaflet library and GeoJSON data from the United States Geological Survey (USGS). The map shows all earthquake data from the past 7 days. The visualization allows users to interact with the map by zooming in/out and panning to explore earthquake data across the globe. Each earthquake is represented as a marker, with size corresponding to the magnitude and color reflecting the depth of the earthquake. **Note:** The starting view was chosen to include the continental US and Alaska as locations of interest. However, users can zoom in or out and shift the map as needed to see data across the globe.

## Features
    - **Interactive Map:** An interactive Leaflet map that displays earthquake data based on their geographic coordinates (latitude and longitude).
    - **Dynamic Markers:** Each earthquake is represented by a marker, where:
        - The size of the marker is proportional to the earthquake’s magnitude.
        - The color of the marker reflects the depth of the earthquake.
    - **Popups:** Each marker has a popup that provides additional information, including the magnitude, location, and the "felt" data.
    - **Legend:** A color-coded legend is included to help users understand the correlation between the depth of an earthquake and the color of the marker.
    - **Map Controls:** Users can interact with the map by zooming and panning to explore data from around the world. They can click on a datapoint to reveal a popup for each earthquake.

## Technologies Used
    - **Leaflet**
    - **D3.js** (a JavaScript library used to handle and visualize the GeoJSON data.)
    - **GeoJSON**

## Data Source
The earthquake data used in this project is sourced from the USGS All Earthquakes in the Past 7 Days dataset. This dataset includes real-time earthquake information, and can be accessed through https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

## How to Use
1. Clone this repository to your local machine.
2. Open the index.html file in your browser to view the interactive map.