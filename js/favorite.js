const id = new URLSearchParams(window.location.search).get("id");
const url = `http://localhost:3000/Favorite/`;

const section = document.querySelector("#awesome .bottom");

fetch(url)
.then((resp) => resp.json())
.then((data) =>
  data.forEach((element) => {
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
            <i class="bi bi-trash3-fill delete"     onclick="deleteElement(${element.id})"></i>

            </div>

        </div>
    </div>
        `;
  })
);

function deleteElement(id) {
  axios.delete(url + id);
  window.location.reload();
}
