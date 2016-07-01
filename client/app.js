// This is a basic map created using Leftlet Quick Start Guide.
// http://leafletjs.com/examples/quick-start.html
const grodnoCityCenter = [53.678, 23.83];
const map = L.map('bus-stops-map', {
    // Disable automatic insertion of an attribution control, so we could put
    // it on the map manully without prefix.
  attributionControl: false,
});
map.setView(grodnoCityCenter, 13);
const tileTemplate = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(tileTemplate, {
  attribution: [
        // Attribution requirements implemented as stated at June 10, 2016.
        // http://www.openstreetmap.org/copyright
    '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ].join(', '),
  maxZoom: 18,
}).addTo(map);

L.control.scale().addTo(map);
// Remove default 'Leftlet' prefix, so attribution control does not overlap
// with scale contol on small screens.
L.control.attribution({ prefix: '' }).addTo(map);


let busStopArray = [];
let clusters = [];
const busIcon = L.icon({
  iconUrl: 'bus.png',
  iconSize: [35, 35],
});

function getAllBusStop() {
  $.getJSON('bus-stop.json', (json) => {
    busStopArray = json;

    const myCluster = L.geoJson(busStopArray, {
      pointToLayer(feature, latlng) {
        const popup = feature.properties['name'];
        const marker = L.marker(latlng, { icon: busIcon });
        marker.bindPopup(popup + '<br><button onclick=schOnClick()>Смотреть расписание</button>');
        return marker;
      },
    });

    clusters = L.markerClusterGroup();
    clusters.addLayer(myCluster);
    map.addLayer(clusters);
  });
}
function schOnClick() {
  document.getElementById('bus-stops').style.display = 'block';
  document.getElementById('bus-stops-map').style.display = 'none';
  document.getElementById('back-map').style.display = 'block';
}
function backmapOnClick() {
  document.getElementById('bus-stops').style.display = 'none';
  document.getElementById('bus-stops-map').style.display = 'block';
  document.getElementById('back-map').style.display = 'none';
}
