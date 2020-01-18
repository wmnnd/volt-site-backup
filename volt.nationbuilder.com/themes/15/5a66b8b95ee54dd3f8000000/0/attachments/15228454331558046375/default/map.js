if (document.getElementById('mapid')) {
  var mymap = L.map('mapid').setView([
    47.86543, 12.79790
  ], 4); 

  var vicon = L.icon({
    iconUrl: 'https://d3n8a8pro7vhmx.cloudfront.net/themes/5a66b8b95ee54dd3f8000000/attachments/original/1544006775/s-marker-icon.png?1544006775',

    iconSize:     [15, 25], // size of the icon
    iconAnchor:   [7, 23], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, -15] // point from which the popup should open relative to the iconAnchor
  });
  
  // wikimedia maps
 L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
	minZoom: 1,
	maxZoom: 18
}).addTo(mymap);
  
/* mapbox maps
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGF5b2JldGhsZWhlbSIsImEiOiJjanBjZDU3MHoweWl1M2twMno4MjgzaW14In0.oGaW5K8xQFuMwKI2jnDYYg', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);
*/
  mymap.scrollWheelZoom.disable();
  mymap.on('click', () => { mymap.scrollWheelZoom.enable();});
  mymap.on('mouseout', () => { mymap.scrollWheelZoom.disable();});
  window.mapMarkers.forEach(function(marker) {
    var headline = "<strong>" + marker.title + "</strong><br/>"
    var content = marker.content ? marker.content + "<br/>" : ""
    var link = marker.link ? "<a href=\"" + marker.link + "\">" + (marker.linkLabel || "Read more …") + "</a>" : ""
    L.marker(marker.position, {icon: vicon})
    .addTo(mymap)
    .bindPopup(headline + content + link)
  })

}