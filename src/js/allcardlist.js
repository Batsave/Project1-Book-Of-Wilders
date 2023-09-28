import { data } from "../data/allwilders.js";

//////////////// Import Card Template ////////////////

import { allCard } from "./card.js";


//////////////// Create a loop to generate the cards ////////////////
let htmlIntegration = "";

for (let i = 0; i < data.length; i++) {
  htmlIntegration += allCard(data[i], i);
}
const cardGenerate = document.getElementsByClassName("all-wilders-list");
cardGenerate[0].innerHTML = htmlIntegration;

window.onload = function () {
  const carousel = new CardCarousel(cardsContainer);
};