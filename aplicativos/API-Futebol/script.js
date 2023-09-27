const token = "c49f85b19fbf45fe8bec8a0cda05d2-87";
const url = "https://api.football-data.org/v4/matches";

fetch(url, {
  headers: {
    "X-Auth-Token": token
  }
})
  .then(response => response.json())
  .then(data => {
    // Lide com os dados da API aqui
    console.log(data);
  })
  .catch(error => {
    // Lide com erros aqui
    console.error(error);
  });
