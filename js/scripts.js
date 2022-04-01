let apiUrl = "https://www.anapioficeandfire.com/api/";

function loadData() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    });
  
}

loadData();
