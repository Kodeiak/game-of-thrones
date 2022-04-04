const gotMenu = document.querySelector(".got-menu");

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
    .then(response => response.json())
    .then (data => {
      console.log(data);
      // addToList(categoryDataList, x)
    })
    .catch(e => console.error(e));    
}

// 1. For each got category, create button/tab
function addListItem(item) {
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
  button.addEventListener("click", function() {loadCategoryData(item.url);});
}

// function loadList(list) {
//   loadData()
//   .then(function() {
//     list.forEach(function(item) {
//       addListItem(item);
//     });
//   });
// }

// must be asynchronous in order to wait for data to load before creating buttons
loadCategories()
  .then(function() {
    categoryList.forEach(function(category) {
      addListItem(category);
    });
  });


// 2. on category click, show first 50 items as buttons
// 3. on item click, show details