export function cardTemplate(data) {
    return `
      <div class="card" id="${data.lastname}-${data.firstname}">
                <img class="profil-picture" src="./src/profil-pictures/${data.firstname}-${data.lastname}.jpg"/>
                <div class="card-section">
                    <a class="card-username">${data.lastname} ${data.firstname}</a>
                    <a class="card-age">${data.age}</a>
                </div>
                <div class="card-section">
                    <a class="card-about-title">Objective</a>
                    <a class="card-about-text">${data.objective}</a>
                </div>
                <div class=" card-link-section">
                    <a class="link-logo facebook" href="${data.facebook}"></a>
                    <a class="link-logo x"href="${data.twitter}"></a>
                    <a class="link-logo instagram"href="${data.instagram}"></a>
                    <a class="link-logo linkedin"href="${data.linkedin}"></a>
                    <a class="link-logo github"href="${data.github}"></a>
                </div>
                
                <button class="card-contact-button">Contacter</button>
                
              </div> 
      `;
}
