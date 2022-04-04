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
  return fetch(categoryUrl)
    .then(response => {
      return response.json();
    })
    .then (data => {
      data.forEach(item => addToList(categoryDataList, item.name));
      // return data.forEach(item => console.log(item.name));
    }).catch(e => console.error(e)); 
}

// 1. For each got category, create button/tab
function addCategoryListItem(item) {
  let gotMenu = document.querySelector(".got-menu");

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
    console.log(item.url);
    return loadList(item.url);});
}

// 2. on category click, show first 50 items as buttons
function addCategoryDataListItem(item) {
  let categoryDataList = document.querySelector(".category-data-list");
  console.log(categoryDataList);

  let categoryDataListItem = document.createElement("li");
  categoryDataListItem.classList.add("category-data-list_item");

  let button = document.createElement("button");
  button.innerText = item;
  button.classList.add("category-data-list_item_button");
  button.setAttribute("type", "button");

  categoryDataListItem.appendChild(button);
  console.log(categoryDataListItem);
  categoryDataList.appendChild(categoryDataListItem);

  // event listener
  // button.addEventListen
}

function loadList(url) {
  loadCategoryData(url)
  .then(function() {
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