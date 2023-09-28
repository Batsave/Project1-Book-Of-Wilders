import { data } from "../data/allwilders.js";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("suggestions");

const closePopup = document.querySelector(".btn-close");
closePopup.addEventListener("click", closeSearch);

const searchBtn = document.querySelector(".btn-search");
searchBtn.addEventListener("click", performSearch);

const openPopup = document.querySelector(".opensearchPopUp");
openPopup.addEventListener("click", openSearch);

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
    const resultat = data.filter(wilder => {
        const firstname = wilder.firstname.toLowerCase();
        const lastname = wilder.lastname.toLowerCase();
        return firstname.includes(input) || lastname.includes(input);
    });

    let suggestions = '';




    resultat.forEach((resultItem) => {
        const fullName = `${resultItem.firstname} ${resultItem.lastname}`;

        suggestions += `<a class="WilderResult" href="#${resultItem.lastname}-${resultItem.firstname}"> ${fullName}</a>`;
    });

    searchResults.innerHTML = suggestions;

    if (input === '') {
        searchResults.innerHTML = '';
    }

}


