let apiUrl = "https://www.anapioficeandfire.com/api/";
let categoryList = [];

function loadData() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(category => {
        add(category);
      });
    }) .catch(e => console.error(e));
}

function add(category) {
  return categoryList.push(category);
}

// 1. For each got category, create button/tab
function addListItem(category) {
  let gotMenu = document.querySelector(".got-menu");
  gotMenu.innerHTML = "";
  
  let gotMenuItem = document.createElement("li");
  gotMenuItem.innerText = category;
  gotMenu.appendChild(gotMenuItem);

  //event listener

}

categoryList.forEach(category => addListItem(category));

// 2. on category click, show first 50 items as buttons
// 3. on item click, show details