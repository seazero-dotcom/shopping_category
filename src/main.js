// Fetch the items from the JSON file
function loadItems() {
  //브라우저 apis 중 하나인 fetch를 사용하여 데이터를 받아온다.
  return (
    fetch("data/data.json")
      .then((response) => response.json()) //fetch는 데이터를 성공적으로 받아오면 response라는 오브젝트를 전달해준다. response에는 body, 상태 등의 정보가 들어있다.
      //response오브젝에 있는 json()이라는 api를 이용해서 response의 body를 json의 오브젝트로 변환할 것이다.
      .then((json) => json.items)
  ); // 변환하게되면 data.json에 정의한 것들을 볼 수 있다!! json.items를 사용하여 items만 불러온다.
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); //map을 이용해서 각각의 아이템을 createHTMLString함수를 이용해서 li태그로 변경해준다.
  // li들이 계속해서 반복되어 들어가있는 문자열을 하나의 큰 문자열로 병합하기위해서 join api를 이용한다. 목록으로 볼 수 있게 ..
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
      <li class="item">
          <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
          <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
      `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset; //event에 있는 클릭이 된 target요소안에 있는 dataset안에 우리가 정의한 key와 value가 들어있다.
  const key = dataset.key; //data-key : type, color
  const value = dataset.value; //data-value: pants, skirt... pink, blue...

  if (key == null || value == null) {
    return; //둘 다 null이면 아무것도 처리하지않고 함수를 끝내겠습니다.
  }

  displayItems(items.filter((item) => item[key] === value)); //key와 value가 들어있을 때 해당하는 것들을 display에 보여준다.
  // 배열에서 어떤 데이터를 특정한 다시 추출해서 새로운 작은 단위의 배열을 만들때 filter를 이용하면 된다.
  // items 배열에 filter를 이용해서 (오브젝트는 [key]를 이용해서 데이터에 접근할 수 있다.)item에있는 key에 해당하는 값이 우리가 원하는 value와 똑같은 아이들만 displayItems로 전달한다.
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo"); //이벤트 리스너를 등록하고 싶은 곳을 컨테이너 단위로 지정한다.
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items)); //이벤트가 발생한 아이와 items를 인자로 전달해준다.
  // buttons에 이벤트가 발생한거니까 event에는 buttons라는 클래스를 보내주는 듯, 그 안에 들어있는 정의한 버튼들이 items.....
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items); //버튼을 클릭했을 때 필터링을 해준다.
  })
  .catch(console.log);
