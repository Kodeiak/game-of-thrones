const gotMenu = document.querySelector(".got-menu");
const categoryDataListContainer = document.querySelector(".category-data-list");

let apiUrl = "https://www.anapioficeandfire.com/api/";
let categoryList = [];
let categoryDataList = [];

function addToList(list, item) {
  return list.push(item);
}

function loadCategories() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        let category = {
          name: key,
          url: data[key]
        };
        addToList(categoryList, category);
      });
    }) .catch(e => console.error(e));
}

function loadCategoryData(categoryUrl) {
  categoryDataList = [];
  return fetch(categoryUrl)
    .then(response => {
      return response.json();
    })
    .then (data => {
      data.forEach(item => {
        let listItem = {
          name: item.name,
          gender: item.gender
        };
      addToList(categoryDataList, listItem);
      });
    }).catch(e => console.error(e)); 
}

// 1. For each got category, create button/tab
function addCategoryListItem(item) {
  //create list item
  let gotMenuItem = document.createElement("li");
  gotMenuItem.classList.add("got-menu_item");
  
  //create button
  let button = document.createElement("button");
  button.innerText = item.name;
  button.classList.add("got-menu_item_button");
  button.setAttribute("type", "button");
  
  //add elements to DOM
  gotMenuItem.appendChild(button);
  gotMenu.appendChild(gotMenuItem);

  //event listener
  button.addEventListener("click", function() {
    return loadList(item.url);
  });
}

// 2. on category click, show first 50 items as buttons
function addCategoryDataListItem(item) {
  let categoryDataListItem = document.createElement("li");
  categoryDataListItem.classList.add("category-data-list_item");

  let button = document.createElement("button");
  if (!item.name) {
    button.innerText = `Unnamed ${item.gender}`;
  } else 
  button.innerText = item.name;
  button.classList.add("category-data-list_item_button");
  button.setAttribute("type", "button");

  categoryDataListItem.appendChild(button);
  categoryDataListContainer.appendChild(categoryDataListItem);

  // event listener
  // button.addEventListen
}

function loadList(url) {
  loadCategoryData(url)
  .then(function() {
    categoryDataListContainer.innerHTML = "";
    categoryDataList.forEach(function(category) {
      addCategoryDataListItem(category);
    });
  });
}

// must be asynchronous in order to wait for data to load before creating buttons
loadCategories()
  .then(function() {
    categoryList.forEach(function(category) {
      addCategoryListItem(category);
    });
  });






// 3. on item click, show details


