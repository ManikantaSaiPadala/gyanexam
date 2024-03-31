let contEle = document.getElementById("container");

function createAndAppend(res) {
    let {
        cityName,
        date,
        distanceKm,
        eventName,
        imgUrl,
        weather
    } = res;
    let driveUrl = imgUrl;
    let directDownloadUrl = driveUrl.replace('/view?usp=sharing', '/uc?export=download');
    let inContEle = document.createElement("div");
    inContEle.style.backgroundImage = `url('${directDownloadUrl}')`;
    inContEle.style.height = "400px";
    inContEle.style.backgroundSize = "cover";
    inContEle.classList.add("inEle");

    let inContEle1 = document.createElement("div");
    let paraEle5 = document.createElement("p");
    paraEle5.textContent = eventName;
    let paraEle1 = document.createElement("p");
    paraEle1.textContent = cityName;
    inContEle1.appendChild(paraEle5);
    inContEle1.appendChild(paraEle1);

    let inContEle2 = document.createElement("div");
    let paraEle2 = document.createElement("p");
    paraEle2.textContent = date;
    let paraEle3 = document.createElement("p");
    paraEle3.textContent = weather;
    inContEle2.appendChild(paraEle2);
    inContEle2.appendChild(paraEle3);

    inContEle.appendChild(inContEle1);
    inContEle.appendChild(inContEle2);

    contEle.appendChild(inContEle);
}

function obtainedResults(results) {
    for (let res of results) {
        createAndAppend(res);
    }
}

function startSliding() {
    let container = document.getElementById("container");
    let elements = container.getElementsByClassName("inEle");

    let totalWidth = container.offsetWidth;
    let offset = 0;

    setInterval(function() {
        offset = (offset - 1) % totalWidth;
        for (let element of elements) {
            element.style.transform = `translateX(${offset}px)`;
        }
    }, 30);
}



let options = {
    method: "GET",
};
fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco", options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        let {
            events
        } = jsonData;
        console.log(events);
        obtainedResults(events);
    });

function createAndAppendCards(events) {
    let container = document.getElementById("footSec");

    events.forEach(event => {
        let card = document.createElement("div");
        card.classList.add("card");

        let image = document.createElement("img");
        image.src = event.imgUrl;
        image.alt = event.eventName;
        card.appendChild(image);

        let details = document.createElement("div");
        details.classList.add("details");

        let eventName = document.createElement("p");
        eventName.textContent = event.eventName;
        details.appendChild(eventName);

        let city = document.createElement("p");
        city.textContent = event.cityName;
        details.appendChild(city);

        let date = document.createElement("p");
        date.textContent = event.date;
        details.appendChild(date);

        let weather = document.createElement("p");
        weather.textContent = event.weather;
        details.appendChild(weather);

        let distance = document.createElement("p");
        distance.textContent = `Distance: ${event.distanceKm} km`;
        details.appendChild(distance);

        card.appendChild(details);
        container.appendChild(card);
    });
}

fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming")
    .then(response => response.json())
    .then(jsonData => {
        let {
            events
        } = jsonData;
        console.log(events);
        createAndAppendCards(events);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
startSliding();