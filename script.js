/*** functions/variables used by both maps ***/

// colors for districts and lines
const mapColors = {
    "Congressional Districts Lines": "#000000",
    "Democratic Party": "#0000FF",
    "Republican Party": "#FF0000",
    "County Lines": "#000000"
};

// districts display blue for democrat, red for republican
function getDistrictFillColor(feature) {
    if(feature.properties.Party === "Democratic Party") {
        return mapColors["Democratic Party"];
    }
    else if (feature.properties.Party === "Republican Party") {
        return mapColors["Republican Party"];
    }
}

// style for congressional districts; calls getFillColor for color based on party
function getDistrictStyle(feature) {
    return {
        fillColor: getDistrictFillColor(feature),
        fillOpacity: 0.5,
        weight: 6,
        opacity: 1,
        color: mapColors["Congressional Districts Lines"]
    }
}

// style for counties: no fill, thin black outline
const countyStyle = {
    fillOpacity: 0,
    color: mapColors["County Lines"],
    weight: 0.4
};

// displays popup with congress member and party, which are in geojson properties
function onEachFeature(feature, layer) {
    let text = feature.properties.Name + ": " + feature.properties.Party;
    layer.bindPopup(text, keepInView=true);
}

// creates legend with district lines, county lines, and political parties
function createLegend(map) {
    // creates div with classes info and legend 
     const div = L.DomUtil.create('div', 'info legend');
     div.innerHTML += '<h3>Legend</h3>';
 
     // loop through our density intervals and generate a label with a colored square for each interval
     for(let key in mapColors) {
         // bold line in legend for congressional district boundaries 
         if (key === "Congressional Districts Lines") {
             div.innerHTML +=
             '<span style="color:' + mapColors[key] + '"><b>&mdash;</b></span>' + key + '<br>';
         }
         // normal line in legend for county lines 
         else if (key === "County Lines") {
             div.innerHTML +=
             '<span style="color:' + mapColors[key] + '">&mdash;</span>' + key + '<br>';
         }
         // color boxes for party
         else {
             div.innerHTML +=
             '<i style="background:' + mapColors[key] + '"></i>' + key + '<br>';
         }
     }
 
     return div;
 }


/*** leaflet-only map (no basemap) ***/

// create map
// TODO: find way to auto center on geojson 
const map = L.map('mapid').setView([44.1555966, -120.6847490], 7);

// make congressional district layer and add to map
const congressionalDistricts = new L.GeoJSON.AJAX("/Congressional_Districts.geojson", {style: getDistrictStyle, onEachFeature: onEachFeature});
congressionalDistricts.addTo(map);

// make county layer and add to map
// interactive set to false allows popups from lower layer to display
const oregonCounties = new L.GeoJSON.AJAX("/oregon_counties.geojson", {style: countyStyle, interactive: false});       
oregonCounties.addTo(map);

// add legend 
const legend = L.control({position: 'topright'});



legend.onAdd = createLegend;

legend.addTo(map);


/******* make stadia map below leaflet map ***********/
// create stadia map
const stadiaMap = L.map('stadiaMap').setView([44.1555966, -120.6847490], 7);

// add stadia map
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(stadiaMap);

const congressionalDistrictsStadia = new L.GeoJSON.AJAX("/Congressional_Districts.geojson", {style: getDistrictStyle, onEachFeature: onEachFeature});
congressionalDistrictsStadia.addTo(stadiaMap);
const oregonCountiesStadia = new L.GeoJSON.AJAX("/oregon_counties.geojson", {style: countyStyle, interactive: false});   
oregonCountiesStadia.addTo(stadiaMap);

const legendStadia = L.control({position: 'topright'});
legendStadia.onAdd = createLegend;

legendStadia.addTo(stadiaMap);