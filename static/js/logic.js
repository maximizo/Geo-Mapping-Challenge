//Create map object
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
var myMap = L.map('map', {
  center: [0,0],
  zoom: 2
});

//Add tile layer to map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 20,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

//Get data with d3
d3.json(url, function(response) {

  //confirm response
  console.log(response)

  //Create marker cluster group
  var markers = L.markerClusterGroup();


  //Loop through data
  for (var i = 0; i < response.features.length; i++) {

    var coordinates = response.features[i].geometry.coordinates;
    //Set data location property to a variable
    //var location = response.features[i]; 

    console.log(coordinates);

    //console.log(response[1])
    //object -> features(array) -> geometry(member) -> coordinates(array)

    //Check for location property
    if (coordinates) {

      //Add new marker to cluster
      markers.addLayer(L.marker([coordinates[0], coordinates[1]])
        .bindPopup(coordinates[i]));
    }
  }

  //Add markers to the map
  myMap.addLayer(markers);
});