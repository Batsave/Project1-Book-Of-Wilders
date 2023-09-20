

function card() {
  const wildersListZone = document.querySelector("main.Wilders-Card-List");

  // Main Div
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("card-box");

  // Profil Picture
  const img = document.createElement("img");
  img.classList.add("profil-picture");
  img.src = "./src/profil-pictures/baptiste-save.jpg";
  mainDiv.appendChild(img);

  // Username Section
  const section1 = document.createElement("div");
  section1.classList.add("card-section");
  const username = document.createElement("a");
  username.classList.add("card-username");
  username.textContent = "Baptiste SAVE";
  section1.appendChild(username);
  mainDiv.appendChild(section1);

  // About Section
  const section2 = document.createElement("div");
  section2.classList.add("card-section");
  const aboutTitle = document.createElement("a");
  aboutTitle.classList.add("card-about-title");
  aboutTitle.textContent = "Objective";
  section2.appendChild(aboutTitle);

  const aboutText = document.createElement("a");
  aboutText.classList.add("card-about-text");
  aboutText.textContent = "Become à front-end developer and make join a UI/UX designer school";
  section2.appendChild(aboutText);
  mainDiv.appendChild(section2);

  // Social Link Section
  const linkSection = document.createElement("div");
  linkSection.classList.add("card-link-section");
  const platforms = ["facebook", "x", "instagram", "linkedin", "github", "behance", "figma", "notion"];
  for (let platform of platforms) {
      const link = document.createElement("a");
      link.classList.add("link-logo", platform);
      linkSection.appendChild(link);
  }
  mainDiv.appendChild(linkSection);

  // Button Section
  const button = document.createElement("button");
  button.classList.add("card-contact-button");
  button.textContent = "Contact this user";
  mainDiv.appendChild(button);

  // Add all to Body
  wildersListZone.appendChild(mainDiv);
}


for (let i = 0; i < 1; i++) {
  card();
}
