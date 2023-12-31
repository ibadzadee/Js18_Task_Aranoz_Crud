const id = new URLSearchParams(window.location.search).get("id");
const url = `http://localhost:3000/data/`;


let name = document.querySelector("#name");
let cost = document.querySelector("#cost");
let img = document.querySelector("#img");
let form = document.querySelector("#form");
let submit = document.querySelector("#submit");
let file = document.querySelector('input[type="file"]');

fetch(url + id)
  .then((res) => res.json())
  .then((data) => {
    img.src = data.image,
      name.value = data.name,
      cost.value = data.cost;
  });


file.addEventListener("input", (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function () {
        img.src = reader.result;
      };
    }
  });
  

form.addEventListener("submit", (event) => {
  event.preventDefault();
  axios.put(url + id , {
    image: img.src,
    name: name.value,
    cost: cost.value
  })
  .then(res=>{
    window.location = "./index.html"
  })

});

let mobileNav = document.querySelector("#mobile-nav")
let menu = document.querySelector("header nav .bi-list")

menu.addEventListener("click" , ()=>{
    if(mobileNav.style.display != "flex"){
        mobileNav.style.display = "flex";
    }
    else{
        mobileNav.style.display = "none";
    }
})