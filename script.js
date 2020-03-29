/* Sources
https://codepen.io/brianplaza/pen/DfKsx
https://github.com/WebsiteBeaver/interactive-and-responsive-svg-map-of-us-states-capitals
https://codepen.io/websitebeaver/pen/oLGGNz
*/

// var map = new L.Map("mapid", {
//     center: new L.LatLng(44.1555966, -120.6847490),
//     zoom: 9,
// });

// L.tileLayer('/nyt_covid19.png', {
// }).addTo(map);

// var congressionalDistricts = fetch("Congressional_Districts.geojson")
// .then(function(response) {
//   return response.json();
// });

var map = L.map('mapid').setView([44.1555966, -120.6847490], 7);
        // mapLink = 
        //     '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        // L.tileLayer(
        //     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; ' + mapLink + ' Contributors',
        //     maxZoom: 18,
        //     }).addTo(map);

// var svgElement = document.createElementNS("oregon_counties.svg", "svg");
// var bounds = [[46, -124], [42, -116]];
// L.svgOverlay(svgElement, bounds).addTo(map);

/* styling 
"NDISTRICT":1
"Party":"Democratic Party"
*/

function getFillColor(feature) {
    if(feature.properties.Party === "Democratic Party") {
        return "#0000FF";
    }
    else if (feature.properties.Party === "Republican Party") {
        return "#FF0000";
    }
}

function defineStyle(feature) {
    return {
        fillColor: getFillColor(feature),
        fillOpacity: 1,
        weight: 6,
        opacity: 1,
        color: "#FFFFFF"
    }
}


var congressionalDistricts = new L.GeoJSON.AJAX("/Congressional_Districts.geojson", {style: (feature) => {
    return defineStyle(feature);
}});
//const congressionalDistricts = new L.GeoJSON("/Congressional_Districts.geojson", {style: defineStyle(FeatureCollection)});
congressionalDistricts.addTo(map);

var countyStyle = {
    fillOpacity: 0,
    color: "#000000",
    weight: 1
};

var oregonCounties = new L.GeoJSON.AJAX("/oregon_counties.geojson", {style: countyStyle});       
oregonCounties.addTo(map);

// map = document.getElementById("oregon_map");
// district1 = document.getElementById("district1");
// district2 = document.getElementById("district2");
// district3 = document.getElementById("district3");
// district4 = document.getElementById("district4");
// district5 = document.getElementById("district5");
// description = document.getElementById("description");

// let district_descriptions = {
//     "district1": "District 1",
//     "district2": "District 2",
//     "district3": "District 3",
//     "district4": "District 4",
//     "district5": "District 5"
// };

// function addDescriptionBox(description, event) {
//     description.classList.remove("inactive");
//     description.classList.add("active");
//     xCoord = event.clientX + "px";
//     yCoord = event.clientY + "px";
//     description.style.left = xCoord;
//     description.style.top = yCoord;
// }

// district1.addEventListener("click", event => {
//     addDescriptionBox(description, event);
//     description.innerHTML = district_descriptions["district1"];
// });

// district2.addEventListener("click", event => {
//     addDescriptionBox(description, event);
//     description.innerHTML = district_descriptions["district2"];
// });

// district3.addEventListener("click", event => {
//     addDescriptionBox(description, event);
//     description.innerHTML = district_descriptions["district3"];
// });

// district4.addEventListener("click", event => {
//     addDescriptionBox(description, event);
//     description.innerHTML = district_descriptions["district4"];
// });

// district5.addEventListener("click", event => {
//     addDescriptionBox(description, event);
//     description.innerHTML = district_descriptions["district5"];
// });