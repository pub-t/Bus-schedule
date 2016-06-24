// This is a basic map created using Leftlet Quick Start Guide.
// http://leafletjs.com/examples/quick-start.html
var grodnoCityCenter = [53.678, 23.83];
var map = L.map('bus-stops-map', {
    // Disable automatic insertion of an attribution control, so we could put
    // it on the map manully without prefix.
    attributionControl: false
})
map.setView(grodnoCityCenter, 13);
var tileTemplate = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(tileTemplate, {
    attribution: [
        // Attribution requirements implemented as stated at June 10, 2016.
        // http://www.openstreetmap.org/copyright
        '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    ].join(', '),
    maxZoom: 18
}).addTo(map);

L.control.scale().addTo(map);
// Remove default 'Leftlet' prefix, so attribution control does not overlap
// with scale contol on small screens.
L.control.attribution({ prefix: '' }).addTo(map);


var layerGroupGeolocation = new L.layerGroup();
var busStopArray = [];
var clusters = [];
var busIcon = L.icon({
    iconUrl: 'bus.png',
    iconSize: [35,35]
});


function getAllBusStop() {

    $.getJSON("bus-stop.json", function (json) {
        busStopArray = json;

    var myCluster = L.geoJson(busStopArray,{
        pointToLayer: function(feature,latlng){
            var popup = feature.properties['name:ru'];
            var marker = L.marker(latlng,{icon: busIcon});
            marker.bindPopup('Bus-stop name: '+ popup);
            return marker;
        }
    });

    clusters = L.markerClusterGroup();
    clusters.addLayer(myCluster);
    map.addLayer(clusters);
    });
}



