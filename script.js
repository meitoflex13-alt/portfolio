
const formulaire = document.querySelector(".contact-form");
const confirmation = document.querySelector(".contact-status");

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bouton = formulaire.querySelector(".contact-button");
    const texteBouton = bouton.textContent;

    bouton.disabled = true;
    bouton.textContent = "Envoi en cours...";

    try {
        const reponse = await fetch(formulaire.action, {
            method: "POST",
            body: new FormData(formulaire),
            headers: {
                Accept: "application/json"
            }
        });

        if (reponse.ok) {
            confirmation.textContent = "Message envoyé avec succès !";
            confirmation.classList.add("visible");
            formulaire.reset();
        } else {
            confirmation.textContent = "Erreur lors de l'envoi. Réessaie.";
            confirmation.classList.add("visible");
        }
    } catch (erreur) {
        confirmation.textContent =
        "Impossible d'envoyer le message. Vérifie ta connexion.";
        confirmation.classList.add("visible");
    } finally {
        bouton.disabled = false;
        bouton.textContent = texteBouton;
    }
});
