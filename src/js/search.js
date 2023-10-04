import { data } from "../data/allwilders.js";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("suggestions");

const closePopup = document.querySelector(".btn-close");
closePopup.addEventListener("click", closeSearch);

const searchBtn = document.querySelector(".btn-search");
searchBtn.addEventListener("click", performSearch);

const openPopup = document.querySelector(".opensearchPopUp");
openPopup.addEventListener("click", openSearch);

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

function openSearch() {
  const popup = document.getElementsByClassName("popup")[0];
  popup.style.display = "flex";
}

function closeSearch() {
  const popup = document.getElementsByClassName("popup")[0];
  popup.style.display = "none";
}



function performSearch() {
  const input = searchInput.value.toLowerCase();
  const resultat = data.filter((wilder) => {
    const firstname = wilder.firstname.toLowerCase();
    const lastname = wilder.lastname.toLowerCase();
    return firstname.includes(input) || lastname.includes(input);
  });

  let suggestions = "";

  resultat.forEach((resultItem) => {
    const fullName = `${resultItem.firstname} ${resultItem.lastname}`;

    suggestions += `<button class="resultbox" onclick="location.href='#${resultItem.lastname}'">
        <span alt="Photo de profil de ${resultItem.lastname} ${resultItem.firstname}" class="profil-picture" style=" background-image:url('./src/profil-pictures/${resultItem.firstname}-${resultItem.lastname}-min.webp')"></span>
        <a class="WilderResult"> ${fullName}</a>
        </button>`;
  });

  searchResults.innerHTML = suggestions;

  if (resultat == "") {
    searchResults.innerHTML = ` <a class="noWilderResult">Aucun Wilders ne correspond à votre recherche</a>`;
  }

  document.querySelectorAll(".resultbox").forEach((link) => {
    link.addEventListener("click", () => {
        handleAnchorChange();
      closeSearch();
    });
  });
}

function handleAnchorChange() {
    // Supprimez la classe 'highlight' de tous les éléments précédemment mis en évidence
    document.querySelectorAll('.highlight-Search').forEach(element => {
        element.classList.remove('highlight-Search');
    });

    // Ajoutez la classe 'highlight' à l'élément avec l'ID correspondant à l'ancre actuelle
    const currentElement = document.querySelector(window.location.hash);
    if (currentElement) {
        currentElement.classList.add('highlight-Search');
        
        // Supprimez la classe 'highlight' après 8 secondes
        setTimeout(() => {
            currentElement.classList.remove('highlight-Search');
        }, 8000);  // 8000 millisecondes équivalent à 8 secondes
    }
}
