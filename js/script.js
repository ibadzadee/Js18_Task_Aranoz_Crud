const menu = document.querySelector("#menu");
const wrapper = document.querySelector(".navbar-wrapper");
menu.addEventListener("click", () => {
  if (window.scrollX < 992) {
    wrapper.classList.toggle("show");
  } else {
    wrapper.classList.remove("show");
  }
});

// ------- from end to top button ------

let topBtn = document.querySelector("#top-button");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "";
  }
});

topBtn.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

// ---------------Data.Json-----------
let url = `http://localhost:3000/data/`;
let section = document.querySelector("#awesome .bottom");
const search = document.querySelector("#search");

let page = 1;
let allData = [];

function fetchData() {
  return fetch(`${url}?_page=${page}&_limit=4`)
    .then((resp) => resp.json())
    .then((data) => {
      allData = allData.concat(data);
      return allData;
    });
}

function showData(filteredData) {
  const dataToShow = filteredData || allData;

  section.innerHTML = '';

  dataToShow.forEach((element) => {
    section.innerHTML += `
      <div class="product">
        <div class="img">
          <img src="${element.image}" alt=""/>
        </div>
        <div class="text">
          <h4>${element.name}</h4>
          <p>${element.cost}</p>
        </div>
        <div class="hover">
          <h5>+ADD TO CART</h5>
          <i class="bi bi-heart heart" onclick="addFav(${element.id} , this)"></i>
        </div>
        <div class="crud">
          <div class="between">
            <i class="bi bi-trash3-fill delete" onclick="deleteElement(${element.id})"></i>
            <i class="bi bi-pencil-square update" onclick="update(${element.id})"></i>
          </div>
          <button id="details" onclick="details(${element.id})">View Details</button>
        </div>
      </div>
    `;
  });
}

function loadMore() {
  page++;
  fetchData().then(() => showData());
}

function applySearch() {
  const keyword = search.value.toLowerCase();
  const filteredData = allData.filter(element => element.name.toLowerCase().includes(keyword));
  showData(filteredData);
}

search.addEventListener("input", applySearch);

let loadBtn = document.querySelector(" #awesome #loadMore");
loadBtn.addEventListener("click", loadMore);

fetchData().then(() => showData());


// delete
function deleteElement(id) {
  axios.delete(url + id);
  window.location.reload();
}

// update
function update(id) {
  window.location = `./update.html?id=${id}`;
}

// add
function addFav(id) {
  window.location = `./favorite.html?id=${id}`;
}
// addFavorite
function addFav(id, heart) {
  axios.get(url + id).then((res) => {
    console.log(res.data);
    axios.post(`http://localhost:3000/Favorite`, res.data);
    axios.post(`./favorites.html`, res.data);
    heart.style.color = "red";
  });
}

// details
function details(id) {
  window.location = `./details.html?id=${id}`;
}

