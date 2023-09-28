export function cardTemplate(data) {
  return `
      <div class="card" id="${data.lastname}-${data.firstname}">
                <img alt="Photo de profil de ${data.lastname} ${data.firstname}" class="profil-picture" src="./src/profil-pictures/${data.firstname}-${data.lastname}-min.webp"/>
                <div class="card-section">
                    <a class="card-username">${data.lastname} ${data.firstname}</a>
                    <a class="card-age">${data.age}</a>
                </div>
                <div class="card-section">
                    <a class="card-about-title">Objectifs</a>
                    <a class="card-about-text">${data.objective}</a>
                </div>
                <div class=" card-link-section">
                    <a class="link-logo facebook" href="${data.facebook}" title="Acceder au profil Facebook de ${data.lastname} ${data.firstname}"></a>
                    <a class="link-logo x"href="${data.twitter}" title="Acceder au profil Twitter de ${data.lastname} ${data.firstname}"></a>
                    <a class="link-logo instagram"href="${data.instagram}" title="Acceder au profil Instagram de ${data.lastname} ${data.firstname}"></a>
                    <a class="link-logo linkedin"href="${data.linkedin}" title="Acceder au profil LinkedIn de ${data.lastname} ${data.firstname}"></a>
                    <a class="link-logo github"href="${data.github}" title="Acceder au Profil GitHub de ${data.lastname} ${data.firstname}"></a>
                </div>
                
                <button class="card-contact-button" title="Contacter ${data.lastname} ${data.firstname}">Contacter</button>
                
              </div> 
      `;
}
