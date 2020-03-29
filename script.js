// create leaflet map
var map = L.map('mapid').setView([44.1555966, -120.6847490], 7);

// districts display blue for democrat, red for republican
function getFillColor(feature) {
    if(feature.properties.Party === "Democratic Party") {
        return "#0000FF";
    }
    else if (feature.properties.Party === "Republican Party") {
        return "#FF0000";
    }
}

// style for congressional districts; calls getFillColor for color based on party
function defineStyle(feature) {
    return {
        fillColor: getFillColor(feature),
        fillOpacity: 1,
        weight: 6,
        opacity: 1,
        color: "#FFFFFF"
    }
}

// displays popup with congress member and party, which are in geojson properties
function onEachFeature(feature, layer) {
    let text = feature.properties.Name + ": " + feature.properties.Party;
    layer.bindPopup(text, keepInView=true);
}

// make congressional district layer and add to map
var congressionalDistricts = new L.GeoJSON.AJAX("/Congressional_Districts.geojson", {style: defineStyle, onEachFeature: onEachFeature});
congressionalDistricts.addTo(map);

// style for counties: no fill, thin black outline
var countyStyle = {
    fillOpacity: 0,
    color: "#000000",
    weight: 1
};

// make county layer and add to map
// interactive set to false allows popups from lower layer to display
var oregonCounties = new L.GeoJSON.AJAX("/oregon_counties.geojson", {style: countyStyle, interactive: false});       
oregonCounties.addTo(map);