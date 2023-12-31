const id = new URLSearchParams(window.location.search).get("id");

let url = `http://localhost:3000/data/`;

const sectionDetails = document.querySelector(".details .bottom");

fetch(url + id)
  .then((data) => data.json())
  .then((element) => {
    sectionDetails.innerHTML += `
    <div class="product">

    <div class="img">
      <img src="${element.image}" alt=""/>
    </div>

    <div class="text">
      <h4>${element.name}</h4>
      <p>${element.cost}</p>
    </div>

    </div>
</div>
    `;
  });
