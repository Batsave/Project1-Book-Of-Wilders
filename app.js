
let data = [
  {
    lastname: "olivier",
    firstname: "carglass",
  },
  {
    lastname: "pierre",
  }
];


function cardTemplate(data) {
  return `
  <div class="card-box">
            <img class="profil-picture" src="./src/profil-pictures/baptiste-save.jpg"/>
            <div class="card-section">
                <a class="card-username" >${data.lastname} ${data.firstname}</a>
            </div>
            <div class="card-section">
                <a class="card-about-title">Objective</a>
                <a class="card-about-text">Become à front-end developer and make join a UI/UX designer school</a>
            </div>
            <div class=" card-link-section">
                <a class="link-logo facebook"></a>
                <a class="link-logo x"></a>
                <a class="link-logo instagram"></a>
                <a class="link-logo linkedin"></a>
                <a class="link-logo github"></a>
                <a class="link-logo behance"></a>
                <a class="link-logo figma"></a>
                <a class="link-logo notion"></a>
            </div>
            <button class="card-contact-button">Contact this user</button>
        </div> 
  `;
}


let htmlIntegration = "";

for (let i = 0; i < data.length; i++) {
  htmlIntegration = htmlIntegration + cardTemplate(data[i]);
}
const cardGenerate = document.getElementsByClassName("Wilders-Card-List");
cardGenerate[0].innerHTML = htmlIntegration;
