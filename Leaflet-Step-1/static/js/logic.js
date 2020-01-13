// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// get data for eathrquakes of last 30 days from earthqauke url
d3.json(queryUrl, function(data) {
    createFeatures(data.features);
  });

  function createFeatures(earthquakeData) {

    
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    // Define function to create the circle radius based on the magnitude
    function markerSize(magnitude) {
      return magnitude * 3000;
    }
  
    // Define function to set the circle color based on the magnitude
    function circleColor(magnitude) {
      if (magnitude < 1) {
        return "#2E8B57"
      }
      else if (magnitude < 2) {
        return "#98FB98"
      }
      else if (magnitude < 3) {
        return "#F4A460"
      }
      else if (magnitude < 4) {
        return "#FFA500"
      }
      else if (magnitude < 5) {
        return "#FF4500"
      }
      else {
        return "#B22222"
      }
    }
  
    // applying color and size to markers
    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function(earthquakeData, latlng) {
        return L.circle(latlng, {
          radius: markerSize(earthquakeData.properties.mag),
          color: circleColor(earthquakeData.properties.mag),
          fillOpacity: 1
        });
      },
      onEachFeature: onEachFeature
    });
  
    createMap(earthquakes);
  }
  function createMap(earthquakes) {

    // Define main map, base map, and overlay map
  
    var mainmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
   
    
    
    var baseMaps = {
      "Map": mainmap,
    };
  
    
    var overlayMaps = {
      Earthquakes: earthquakes,
    };
  
    // Create map
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 4,
      layers: [mainmap, earthquakes]
    });
  
    
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  
  
  }