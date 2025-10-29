const container = document.querySelector(".container");
let cartes = [];
let premiereCarte;
let deuxiemeCarte;

for(let j = 0; j < 2; j++){
  for(let i = 1; i < 9; i++){
    let carte = document.createElement("div");
    carte.classList.add("carte");

    carte.dataset.image = `img/${i}.png`;
    carte.style.backgroundImage = "url('img/dos.png')";
    carte.style.backgroundSize = "cover";
    carte.style.backgroundPosition = "center";
    carte.style.backgroundRepeat = "no-repeat";

    container.appendChild(carte);
    cartes.push(carte);

    // on fait l'événement dans le boucle car chaque carte doit avoir son propre événement 
    carte.addEventListener("click", function() {
      if (carte.style.backgroundImage.includes("dos.png")) {
        carte.style.backgroundImage = `url('${carte.dataset.image}')`;

        if (!premiereCarte) {
          premiereCarte = carte;
        } else {
          deuxiemeCarte = carte;

          if (premiereCarte.dataset.image === deuxiemeCarte.dataset.image) {
            premiereCarte = null;
            deuxiemeCarte = null;
          } else {
            setTimeout(function() {
              premiereCarte.style.backgroundImage = "url('img/dos.png')";
              deuxiemeCarte.style.backgroundImage = "url('img/dos.png')";
              premiereCarte = null;
              deuxiemeCarte = null;
            }, 800);
          }
        }
      }
    });
  }
}

// Mélange les cartes
cartes.sort(() => Math.random() - 0.5);
cartes.forEach(carte => container.appendChild(carte));