map = document.getElementById("oregon_map");
district1 = document.getElementById("district_1");
description = document.getElementById("description");

district1.addEventListener("mouseenter", event => {
    description.classList.remove("inactive");
    description.classList.add("active");
    xCoord = event.clientX + "px";
    yCoord = event.clientY + "px";
    description.style.left = xCoord;
    description.style.top = yCoord;
});

district1.addEventListener("mouseleave", event => {
    description.classList.remove("active");
    description.classList.add("inactive");
});