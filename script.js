// =========================
// AJOUTER AU PANIER
// =========================

const boutons = document.querySelectorAll(".ajouter-panier");

boutons.forEach(function(bouton) {

    bouton.addEventListener("click", function() {

        const nom = bouton.dataset.nom;
        const prix = bouton.dataset.prix;
        const image = bouton.dataset.image; 

        let panier = JSON.parse(localStorage.getItem("panier")) || [];

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
        <p>${produit.prix} F</p>
    </div>

    <div class="quantite">
        <button class="moins">−</button>
        <span>${produit.quantite || 1}</span>
        <button class="plus">+</button>
    </div>

    <button class="supprimer-produit">
        Supprimer
    </button>
`;

        listePanier.appendChild(article);

       total = total + Number(produit.prix) * produit.quantite;

        const boutonSupprimer =
            article.querySelector(".supprimer-produit");
            const boutonMoins = article.querySelector(".moins");
const boutonPlus = article.querySelector(".plus");
const affichageQuantite = article.querySelector(".quantite span");

boutonPlus.addEventListener("click", function() {

    panier[index].quantite++;

    localStorage.setItem("panier", JSON.stringify(panier));

    location.reload();

});

boutonMoins.addEventListener("click", function() {

    if (panier[index].quantite > 1) {

        panier[index].quantite--;

        localStorage.setItem("panier", JSON.stringify(panier));

        location.reload();

    }

});

        boutonSupprimer.addEventListener("click", function() {

            panier.splice(index, 1);

            localStorage.setItem("panier", JSON.stringify(panier));

            location.reload();

        });

    });

    totalPanier.textContent = "Total : " + total + " F";

}



const boutonWhatsApp = document.querySelector("#commander-whatsapp");

if (boutonWhatsApp) {

    boutonWhatsApp.addEventListener("click", function() {

        let panier = JSON.parse(localStorage.getItem("panier")) || [];

        let message = "Bonjour, je souhaite commander :%0A%0A";

        panier.forEach(function(produit) {

            message += produit.nom + " x " + produit.quantite;
            message += " - " + Number(produit.prix) * produit.quantite + " F%0A";

        });

        let total = 0;

        panier.forEach(function(produit) {

            total += Number(produit.prix) * produit.quantite;

        });

        message += "%0ATotal : " + total + " F";

        const numero = "2250565671487";

        window.location.href =
            "https://wa.me/" + numero + "?text=" + message;

    });

}