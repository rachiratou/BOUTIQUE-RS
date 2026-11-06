
// =========================
// AJOUTER AU PANIER
// =========================

const boutons = document.querySelectorAll(".ajouter-panier");

boutons.forEach(function(bouton) {

    bouton.addEventListener("click", function() {

        const nom = bouton.dataset.nom;
        const prix = Number(bouton.dataset.prix);
        const image = bouton.dataset.image;

        let panier = JSON.parse(localStorage.getItem("panier")) || [];

        // Vérifier si le produit existe déjà
        panier.push({
    nom: nom,
    prix: prix,
    image: image,
    quantite: 1
});

        localStorage.setItem("panier", JSON.stringify(panier));

        alert("Produit ajouté au panier 🛒");

    });

});


// =========================
// AFFICHER LE PANIER
// =========================

const listePanier = document.querySelector("#liste-panier");
const totalPanier = document.querySelector("#total-panier");

if (listePanier && totalPanier) {

    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    let total = 0;

    listePanier.innerHTML = "";

    panier.forEach(function(produit, index) {

        if (!produit.quantite) {
            produit.quantite = 1;
        }

        const article = document.createElement("div");

        article.classList.add("article-panier");

        article.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">

            <div>
                <h2>${produit.nom}</h2>
                <p>${Number(produit.prix).toLocaleString("fr-FR")} F</p>
            </div>

            <div class="quantite">
                <button class="moins">−</button>
                <span>${produit.quantite}</span>
                <button class="plus">+</button>
            </div>

            <button class="supprimer-produit">
                Supprimer
            </button>
        `;

        listePanier.appendChild(article);

        total += Number(produit.prix) * produit.quantite;

        const boutonSupprimer = article.querySelector(".supprimer-produit");
        const boutonMoins = article.querySelector(".moins");
        const boutonPlus = article.querySelector(".plus");

        // AUGMENTER LA QUANTITE
        boutonPlus.addEventListener("click", function() {

            panier[index].quantite++;

            localStorage.setItem("panier", JSON.stringify(panier));

            location.reload();

        });

        // DIMINUER LA QUANTITE
        boutonMoins.addEventListener("click", function() {

            if (panier[index].quantite > 1) {

                panier[index].quantite--;

                localStorage.setItem("panier", JSON.stringify(panier));

                location.reload();

            }

        });

        // SUPPRIMER UN PRODUIT
        boutonSupprimer.addEventListener("click", function() {

            panier.splice(index, 1);

            localStorage.setItem("panier", JSON.stringify(panier));

            location.reload();

        });

    });

    totalPanier.textContent =
        "Total : " + total.toLocaleString("fr-FR") + " F";

    // Enregistrer les quantités corrigées
    localStorage.setItem("panier", JSON.stringify(panier));

}


// =========================
// COMMANDER SUR WHATSAPP
// =========================

const boutonWhatsApp = document.querySelector("#commander-whatsapp");

if (boutonWhatsApp) {

    boutonWhatsApp.addEventListener("click", function() {

        let panier = JSON.parse(localStorage.getItem("panier")) || [];

        if (panier.length === 0) {
            alert("Votre panier est vide !");
            return;
        }

        let message = "Bonjour, je souhaite commander :\n\n";

        let total = 0;

        panier.forEach(function(produit) {

            const sousTotal = Number(produit.prix) * produit.quantite;

            message += "Produit : " + produit.nom + "\n";
            message += "Quantité : " + produit.quantite + "\n";
            message += "Prix : " + sousTotal.toLocaleString("fr-FR") + " F\n";
            message += "Photo : " + produit.image + "\n\n";

            total += sousTotal;

        });

        message += "TOTAL : " + total.toLocaleString("fr-FR") + " F";

        const numero = "2250565671487";

        window.open(
            "https://wa.me/" + numero + "?text=" + encodeURIComponent(message),
            "_blank"
        );

    });

}


// =========================
// AGRANDIR UNE IMAGE
// =========================

function agrandirImage(image) {

    let nouvelleFenetre = window.open("", "_blank");

    if (!nouvelleFenetre) {
        alert("Autorise les fenêtres pop-up pour agrandir l'image.");
        return;
    }

    nouvelleFenetre.document.write(`
        <html>
        <head>
            <title>Image agrandie</title>

            <style>
                body {
                    margin: 0;
                    background: black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                img {
                    max-width: 95%;
                    max-height: 95%;
                    object-fit: contain;
                }
            </style>
        </head>

        <body>
            <img src="${image.src}">
        </body>
        </html>
    `);

    nouvelleFenetre.document.close();

}
