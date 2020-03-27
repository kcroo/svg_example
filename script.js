/* Sources
https://codepen.io/brianplaza/pen/DfKsx
https://github.com/WebsiteBeaver/interactive-and-responsive-svg-map-of-us-states-capitals
https://codepen.io/websitebeaver/pen/oLGGNz
*/

map = document.getElementById("oregon_map");
district1 = document.getElementById("district1");
district2 = document.getElementById("district2");
district3 = document.getElementById("district3");
district4 = document.getElementById("district4");
district5 = document.getElementById("district5");
description = document.getElementById("description");

let district_descriptions = {
    "district1": "District 1",
    "district2": "District 2",
    "district3": "District 3",
    "district4": "District 4",
    "district5": "District 5"
};

function addDescriptionBox(description, event) {
    description.classList.remove("inactive");
    description.classList.add("active");
    xCoord = event.clientX + "px";
    yCoord = event.clientY + "px";
    description.style.left = xCoord;
    description.style.top = yCoord;
}

district1.addEventListener("click", event => {
    addDescriptionBox(description, event);
    description.innerHTML = district_descriptions["district1"];
});

district2.addEventListener("click", event => {
    addDescriptionBox(description, event);
    description.innerHTML = district_descriptions["district2"];
});

district3.addEventListener("click", event => {
    addDescriptionBox(description, event);
    description.innerHTML = district_descriptions["district3"];
});

district4.addEventListener("click", event => {
    addDescriptionBox(description, event);
    description.innerHTML = district_descriptions["district4"];
});

district5.addEventListener("click", event => {
    addDescriptionBox(description, event);
    description.innerHTML = district_descriptions["district5"];
});