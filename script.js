var json;
window.onload = function fetchData(){
    const url = 'photos.json';
    fetch(url)
        .then(function(u){
            return u.json();
        })
        .then(function(json){
            loadImages(json);
            this.json = json;
        })
}

var ph = [];
function loadImages(json) {

    const gallery = document.getElementById("gallery");
    for (let i = 0; i < json.photos.length; i++) {
        ph.push(json.photos[i]);
        initMarkers(i, map)
    }
    for (let i = 0; i < ph.length; i++) {

        const imgDiv = gallery.appendChild(document.createElement("div"));
        imgDiv.setAttribute("class", "image-container");
        imgDiv.setAttribute("id", "img-div" + i);
        const img = imgDiv.appendChild(document.createElement("img"));
        img.setAttribute("class", "images");
        img.setAttribute("id", "img" + (i+1));
        img.setAttribute("src", ph[i].path);
        img.setAttribute("alt", ph[i].title);

        img.onclick = function (){
            console.log("prd c. " + i);
            openModal(i);
        };
    }
}
var index;
function openModal(i) {
    initModalMap(i);
    initMarkers(i, modalMap);
    const myModalEl = document.getElementById('modal');
    myModalEl.style.display = "block";
    const modalTitle = document.getElementById("modal-title");
    modalTitle.innerHTML = ph[i].title;
    const btnPrev = document.getElementById("btn-prev");
    btnPrev.onclick = function () {
        if (i === 0){
            i = ph.length;
        }
        console.log("index " + ph[i - 1].title)
        openModal(i - 1);
    }
    const btnNext = document.getElementById("btn-next");
    btnNext.onclick = function () {
        nextImg(i);
    }
    const btnShow = document.getElementById("btn-show");
    btnShow.onclick = function () {
        index = i - 1;
        slideshow();
    }
    const image = document.getElementById("modal-image");
    image.setAttribute("class", "modal-images");
    image.setAttribute("src", ph[i].path);
    image.setAttribute("alt", ph[i].title);
    let optionsDate =
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };

    document.getElementById("date").innerHTML = new Date(ph[i].date).toLocaleString('sk', optionsDate);
    document.getElementById("description").innerHTML = ph[i].description;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function nextImg(i) {
    if (i === ph.length - 1){
        i = - 1;
    }
    openModal( i + 1);
}

var timeout;

function slideshow() {
    nextImg(index);
    timeout = setTimeout(slideshow, 3000);
    if (index === ph.length - 1){
        index = - 1;
    }
    index++;
}

function stopShow(){
    clearTimeout(timeout);
    console.log("STOP")
}

function search() {
    let keyword = document.getElementById('search').value.toUpperCase();
    for(let i = 0; i < ph.length; i++){
        let imgDiv = document.getElementById("img-div" + i);
        if(ph[i].description.toUpperCase().includes(keyword) || ph[i].title.toUpperCase().includes(keyword)){
            imgDiv.style.display = "";
        }
        else {
            imgDiv.style.display = "none";
        }
    }
}

var map;
var modalMap;
function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 48.562, lng: 19.130},
        zoom: 7,
    });
}
function initModalMap(i) {
    console.log("i: " + i);
    let lat = Number(ph[i].gps.lat);
    let lng = Number(ph[i].gps.lng);
    modalMap = new google.maps.Map(document.getElementById("map-modal"), {
        center: { lat: lat, lng: lng },
        zoom: 7,
    });
}


window.initMap = initMap;

function initMarkers(i, map) {

    let lat = Number(ph[i].gps.lat);
    let lng = Number(ph[i].gps.lng);

    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
    });

    marker.addListener("click", () => {
        console.log("klikol si " + i);
        openModal(i);
    });
}

let isRoute = false;
function calcRoute() {
    isRoute = !isRoute;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const wayPointsInDirections = [];
    for (let i = 1; i < ph.length - 1; i++) {
        let addedLocation = {
            location: new google.maps.LatLng(Number(ph[i].gps.lat), Number(ph[i].gps.lng)),
            stopover: false,
        }
        wayPointsInDirections.push(addedLocation);

    }
    let request = {
        //first location by date
        origin: new google.maps.LatLng(Number(ph[0].gps.lat), Number(ph[0].gps.lng)),
        //last location by date
        destination: new google.maps.LatLng(Number(ph[11].gps.lat), Number(ph[11].gps.lng)),
        waypoints: wayPointsInDirections,
        // driving
        travelMode: google.maps.TravelMode.DRIVING,
    }
    directionsRenderer.setMap(null);
    directionsRenderer.setDirections({ routes: [] });
    let output = document.querySelector("#output");
    output.innerHTML = "";
    if (isRoute) {
        directionsRenderer.setMap(null);
        directionsService.route(request, (summary, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setMap(map);
                output.innerHTML = "<div class='alert-info'> Vzdialenosť: " + summary.routes[0].legs[0].distance.text + "</div>" + "Čas: " + summary.routes[0].legs[0].duration.text;
                directionsRenderer.setDirections(summary);
            } else {
                directionsRenderer.setDirections({routes: []});
            }
        })
    }
}
