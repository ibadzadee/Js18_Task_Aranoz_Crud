const id = new URLSearchParams(window.location.search).get("id");

const url = `http://localhost:3000/data/`;

const form = document.querySelector(".form #form");
const imgInp = document.querySelector("#img")
const nameInp = document.querySelector("#name")
const costInp = document.querySelector("#cost")
form.addEventListener("submit" , (event)=>{
    event.preventDefault();
    let src = imgInp.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(src);
    reader.onload = (e)=>{
        let obj ={
            image: e.target.result,
            name:nameInp.value,
            cost: costInp.value
        }
        axios.post(url , obj)
        .then(res=>
            window.location = "./index.html"
            )
    }
})
