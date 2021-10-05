// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Creates HTML element from given item
function createElement(item) {
  const img = document.createElement("img");
  img.setAttribute("class", "thumbnail");
  img.setAttribute("src", item.image);

  const span = document.createElement("span");
  span.setAttribute("class", "description");
  span.innerText = `${item.gender}, ${item.size} size`;
  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.setAttribute("data-type", item.type);
  li.setAttribute("data-color", item.color);
  li.append(img);
  li.append(span);
  return li;
}

// Handle button click
function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value); //버튼이 클릭이되면 해당하는 key와 value를 updateItems함수를 이용해서
}

// Make the items matching {key: value} invisible.
function updateItems(items, key, value) {
  //html요소가 들어있는 items배열을 빙글빙글 돌면서 해당하는 요소들만 클래스를 이용해서 보여주고/보여지지 않고 이런식으로 한다.
  // 버튼이 클릭될 때마다 전체적인 리스트가 다시 업데이트 되어져야하는 불필요한 과정을 생략할 수 있다.
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

loadItems().then((items) => {
  const elements = items.map(createElement);
  const container = document.querySelector(".items");
  container.append(...elements);
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (event) => onButtonClick(event, elements));
});
