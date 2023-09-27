// script.js

const token = "c49f85b19fbf45fe8bec8a0cda05d2-87";
const url = "https://api.football-data.org/v4/matches";

function buscarPartidas() {
    fetch(url, {
        headers: {
            "X-Auth-Token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        const apiDataString = JSON.stringify(data, null, 2);
        document.getElementById("api-data").textContent = apiDataString;
    })
    .catch(error => {
        console.error(error);
    });
}
