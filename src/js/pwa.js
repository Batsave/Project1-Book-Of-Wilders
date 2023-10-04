if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/src/js/pwa.js")
      .then(() => {
        console.log("Service Worker enregistré avec succès:");
      })
      .catch((error) => {
        console.error("Échec de l’enregistrement du Service Worker:", error);
      });
  });
}
