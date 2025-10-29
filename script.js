const container = document.querySelector(".container");
for(let j=0; j<2; j++){
for(let i=1; i<9; i++){
let carte = document.createElement("div")
carte.classList.add("carte")
let image = `url('img/${i}.png')`;
let dos =  "url(img/dos.png)";

carte.style.backgroundImage = dos;
carte.style.backgroundSize = "cover";
carte.style.backgroundPosition = "center";
carte.style.backgroundRepeat = "no-repeat";
container.appendChild(carte);

carte.addEventListener("click", function(){
    carte.style.transform = "rotateY(180deg)"
    carte.style.backgroundImage = image;
});

}}