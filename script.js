const container = document.querySelector(".container");
let cartes = [];
let premiereCarte = null;
let deuxiemeCarte = null;
let verrou = false;
let tentatives = 0;

let bestScore = localStorage.getItem("bestScore") || null;
if (bestScore) {
  document.getElementById("best-score").textContent = bestScore;
}

for (let j = 0; j < 2; j++) {
  for (let i = 1; i < 9; i++) {
    let carte = document.createElement("div");
    carte.classList.add("carte");
    carte.dataset.image = `img/${i}.png`;
    carte.dataset.matched = "false";
    carte.style.backgroundImage = "url('img/dos.png')";
    carte.style.backgroundSize = "cover";
    carte.style.backgroundPosition = "center";
    carte.style.backgroundRepeat = "no-repeat";

    container.appendChild(carte);
    cartes.push(carte);

    carte.addEventListener("click", function() {
      if (verrou || carte.dataset.matched === "true" || carte === premiereCarte) return;

      carte.style.backgroundImage = `url('${carte.dataset.image}')`;

      if (!premiereCarte) {
        premiereCarte = carte;
      } else {
        deuxiemeCarte = carte;
        verrou = true;
        tentatives++;
        document.getElementById("score").textContent = tentatives;

        if (premiereCarte.dataset.image === deuxiemeCarte.dataset.image) {
          premiereCarte.dataset.matched = "true";
          deuxiemeCarte.dataset.matched = "true";
          premiereCarte = null;
          deuxiemeCarte = null;
          verrou = false;
          checkVictory();
        } else {
          setTimeout(() => {
            premiereCarte.style.backgroundImage = "url('img/dos.png')";
            deuxiemeCarte.style.backgroundImage = "url('img/dos.png')";
            premiereCarte = null;
            deuxiemeCarte = null;
            verrou = false;
          }, 800);
        }
      }
    });
  }
}

cartes.sort(() => Math.random() - 0.5);
cartes.forEach(carte => container.appendChild(carte));

function checkVictory() {
  const toutesAp = cartes.every(c => c.dataset.matched === "true");
  if (toutesAp) {
    document.getElementById("final-score").textContent = tentatives;
    document.getElementById("victory-message").style.display = "block";

    if (!bestScore || tentatives < bestScore) {
      bestScore = tentatives;
      localStorage.setItem("bestScore", bestScore);
      document.getElementById("best-score").textContent = bestScore;
    }
  }
}

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});