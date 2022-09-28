function rechercher() {
    //Ajout d'éléments en javascript
    //déclaration
    var chaussons = false;
    var baudrier = false;
    var tapis = false;

    var list = new String("Vous rechercher : ");

    //recupération de variables (checkbox, dates, salle)
    if (document.getElementById("chaussons").checked) {
        //alert("chaussons checked");
        chaussons = true;
        list += "des chaussons d'escalade ; ";
    }
    if (document.getElementById("baudrier").checked) {
        //alert("baudrier checked");
        baudrier = true;
        list += "un/des baudrier(s) ; ";
    }
    if (document.getElementById("tapis").checked) {
        //alert("tapis checked");
        tapis = true;
        list += "un/des tapis(s) ; ";
    }
    let date_emprunt = document.getElementById("dateEmprunt").value;
    let date_retour = document.getElementById("dateRetour").value;

    list += " (Emprunt le : " + date_emprunt + ", Retour le : " + date_retour + ")";


    //recupération du container d'affichage
    let main_container = document.getElementById('rechercheContainer');

    //creation de l'alerte a déclencher
    let htmlContent = '<div class="alert alert-success alert-dismissible">' +
        '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Success!</strong> Votre choix de recherche à bien été pris en compte --> ' +
        list + '</div>';

    //Ajoute le contenu de htmlContent avant la balise fermante de main_container
    main_container.insertAdjacentHTML('beforeend', htmlContent);
};

function proposer() {
    close();

    //Ajout d'éléments en javascript
    let main_container = document.getElementById('rechercheContainer');
    let htmlContent = '<div class="alert alert-success alert-dismissible">' +
        '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>Success!</strong> Vos matériels ont bien été mis en location</div>';

    //Ajouter le contenu de htmlContent avant la balise fermante de main_container
    main_container.insertAdjacentHTML('beforeend', htmlContent);
};

function close()
{
    $('#modal_modify').modal('toggle');
}


// Event Listener
document.getElementById("btnRecherche").addEventListener("click", rechercher); //validation de ce que l'on recherche
document.getElementById("monlien").addEventListener("click", proposer); //mise en location de matériels


function hide(id) {

    //pop up de validation
    var r = confirm("Supprimer l'annonce ?");
    if (r == true) {
        var up = document.getElementById(id);
        up.remove();

        let htmlContent = '<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>Success!</strong> Vous avez supprimé votre annonce  </div>';
        let recherches = document.getElementById('notif_suppr');
        recherches.insertAdjacentHTML('beforeend', htmlContent)
    }

}

function join(id) {
    var r = confirm("Voulez vous louer ?");
    if (r) {
        //alert("Félicitation! Vous avez trouvé un partenaire");
        let htmlContent = '<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>Success!</strong> Félicitation vous avez loué du matériel !  </div>';
        let recherches = document.getElementById('notif_join');
        recherches.insertAdjacentHTML('beforeend', htmlContent) //Ajouter le contenu de htmlContent avant la balise fermante de recherche

        var up = document.getElementById(id);
        up.remove(); //Comme le matériel est loué on l'enlève de la liste
    }
}

function modify(id) { //message Succes pour informer l'utilisateur
    
    let htmlContent = '<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>Success!</strong> Vos modifications ont été prisent en compte  </div>';
    let recherches = document.getElementById(id);
    recherches.insertAdjacentHTML('beforeend', htmlContent) //Ajouter le contenu de htmlContent avant la balise fermante de recherches
}

function display(id) //Lancement du modal modal_modify pour proposer du matériels
{
    $("#modal_modify").modal()
    $("#modal_modify").modal("show")
}
