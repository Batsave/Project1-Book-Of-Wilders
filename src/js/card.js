export function cardTemplate(data) {
    return `
      <div class="card">
                <div alt="Photo de profil de ${data.lastname} ${data.firstname}" class="profil-picture" style=" background-image:url('./src/profil-pictures/${data.firstname}-${data.lastname}-min.webp')"></div>
                <div class="card-section">
                    <p class="card-username">${data.lastname} ${data.firstname}</p>
                    ${data.age ? `<p class="card-age"> ${data.age} ans </p>` : `<p class="card-age">Secret</p>`}
                </div>
                <div class="card-section">
                    <p class="card-about-title">Objectifs</p>
                    <p class="card-about-text">${data.objective}</p>
                </div>
                <div class=" card-link-section">
                ${data.facebook ? `<a class="link-logo facebook" href="${data.facebook}" title="Acceder au profil Facebook de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.twitter ? `<a class="link-logo x" href="${data.twitter}" title="Acceder au profil Twitter de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.instagram ? `<a class="link-logo instagram" href="${data.instagram}" title="Acceder au profil Instagram de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.linkedin ? `<a class="link-logo linkedin" href="${data.linkedin}" title="Acceder au profil LinkedIn de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.github ? `<a class="link-logo github" href="${data.github}" title="Acceder au Profil GitHub de ${data.lastname} ${data.firstname}"></a>` : ''}
                </div>
                
                <button onClick="location.href='mailto:${data.mail}'" class="card-contact-button" title="Contacter ${data.lastname} ${data.firstname}">Contacter</button>
                
              </div> 
      `;
}

export function allCard(data) {
    return `
      <div class="card" id="${data.lastname}-${data.firstname}">
      <div alt="Photo de profil de ${data.lastname} ${data.firstname}" class="profil-picture" style=" background-image:url('./src/profil-pictures/${data.firstname}-${data.lastname}-min.webp')"></div>
                <div class="card-section">
                    <p class="card-username">${data.lastname} ${data.firstname}</p>
                    ${data.age ? `<p class="card-age"> ${data.age} ans </p>` : `<p class="card-age">Secret</p>`}
                </div>
                <div class="card-section">
                    <p class="card-about-title">Objectifs</p>
                    <p class="card-about-text">${data.objective}</p>
                </div>
                <div class=" card-link-section">
                ${data.facebook ? `<a class="link-logo facebook" href="${data.facebook}" title="Acceder au profil Facebook de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.twitter ? `<a class="link-logo x" href="${data.twitter}" title="Acceder au profil Twitter de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.instagram ? `<a class="link-logo instagram" href="${data.instagram}" title="Acceder au profil Instagram de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.linkedin ? `<a class="link-logo linkedin" href="${data.linkedin}" title="Acceder au profil LinkedIn de ${data.lastname} ${data.firstname}"></a>` : ''}
                ${data.github ? `<a class="link-logo github" href="${data.github}" title="Acceder au Profil GitHub de ${data.lastname} ${data.firstname}"></a>` : ''}
                </div>
                
                <button onClick="location.href='mailto:${data.mail}'" class="card-contact-button" title="Contacter ${data.lastname} ${data.firstname}">Contacter</button>
                
              </div> 
      `;
}