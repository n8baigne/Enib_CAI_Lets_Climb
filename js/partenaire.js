var i = 3;
var id_mod = 0;




//fonction pour supprimer une proposition
//demande à l'utilisateur s'il est sur de son choix, supprime la proposition si oui et affiche une alerte
function hide(id) {

    
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

//fonction pour rejoindre une proposition
//demande à l'utilisateur s'il est sur de son choix, supprime la proposition si oui et affiche une alerte
function join(id) {
    var r = confirm("Voulez vous rejoindre ?");
    if (r) {

        let htmlContent = '<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>Success!</strong> Félicitation vous avez rejoint un partenaire !  </div>';
        let recherches = document.getElementById('notif_join');
        recherches.insertAdjacentHTML('beforeend', htmlContent)

        var up = document.getElementById(id);
        up.remove();

    }
}


//fonction pour créer une nouvelle proposition
//récupère les données du form, vérifie que les champs ne sont pas vides, crée le code HTML et l'ajoute 
function add() {

    let date = document.getElementById("date").value
    let lieu = document.getElementById("lieu").value
    let heure = document.getElementById("heure").value


    if (date == "" || heure == "") {
        alert("champs incomplets ");
    } else {

        i++;//identifiant unique à chaque proposition (pour récupérer les données dans d'autres fonctions)

        //proposition
        let htmlContent1 ='<div class="card card-body m-2 " id="mes_prop_'+i+'">    <div class="row  align-items-center">        <div class="col-2">            <div class="row justify-content-center px-3" >                 <input type="date" name="date" value="'+date+'" disabled="disabled" id="mes_prop_date_'+i+'"/>                <input type="time" name="heure" id="mes_prop_heure_'+i+'" disabled="disabled" value="'+heure+'">            </div>        </div>        <div class="col-2 ">            <div class="row justify-content-center px-3">lieu</div>            <div class="row justify-content-center px-3">                <select disabled="disabled" id="mes_prop_lieu_'+i+'">                    <option value="Climb-up">Climb-up</option>                    <option value="The roof">The roof</option>                    <option value="Le cube">Le cube</option>                </select>              </div>        </div>        <div class="col-4">            <div class="row justify-content-center">matériel</div>            <div class="row justify-content-center"><textarea rows="1" cols="30" style="resize: none;" disabled="disabled" id="mes_prop_mat_'+i+'">chaussons, baudrier</textarea></div>        </div>        <div class="col-1">            <div class="row justify-content-center">niveau</div>            <div class="row justify-content-center">6B</div>        </div>        <div class="col-2 justify-content-center">            <div class="row justify-content-center"><button type="submit" class="btn btn-primary "  onclick="modify(\''+i+'\')">Modifier</button></div>        </div>        <div class="col-1 ">            <button type="button" class="close" aria-label="Close" onclick="hide(\'mes_prop_'+i+'\')"><span aria-hidden="true">&times;</span></button>        </div>    </div></div>'
        let mes_propositions = document.getElementById('mes_propositions');
        mes_propositions.insertAdjacentHTML('beforeend', htmlContent1);

        //alert
        let htmlContent2 = '<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>Success!</strong> Félicitation vous avez crée une nouvelle session </div>';
        let recherches = document.getElementById('recherches');
        recherches.insertAdjacentHTML('beforeend', htmlContent2);

        $('#mes_prop_lieu_'+i).val(lieu);
        document.getElementById("mes_prop_bandeau").scrollIntoView();
        
    }
}

//fonction pour modifier une proposition
//met à jour les données du modal (pour correspondre à la session à modifier) puis l'affiche
function modify(id) {

    $('#date_mod').val(document.getElementById("mes_prop_date_"+id).value);
    $('#lieu_mod').val(document.getElementById("mes_prop_lieu_"+id).value);
    $('#heure_mod').val(document.getElementById("mes_prop_heure_"+id).value);
    $('#mat_mod').val(document.getElementById("mes_prop_mat_"+id).value);

    id_mod = id;//pour retrouver l'id de la proposition à modifier (lorsque l'on appuiera sur save)

    $("#modal_modify").modal()
    $("#modal_modify").modal("show")


}

//fonction pour mettre à jour une proposition à partir du modal
//on récupère les données du modal et on actualise la proposition puis on ferme le modal et alert
function change_values_prop(){
    $('#mes_prop_date_'+id_mod).val(document.getElementById("date_mod").value);
    $('#mes_prop_lieu_'+id_mod).val(document.getElementById("lieu_mod").value);
    $('#mes_prop_heure_'+id_mod).val(document.getElementById("heure_mod").value);
    $('#mes_prop_mat_'+id_mod).val(document.getElementById("mat_mod").value);

    $("#modal_modify").modal("hide")

    let htmlContent = '<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-bs-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>Success!</strong> Vous avez modifié votre annonce  </div>';
    let recherches = document.getElementById('notif_suppr');
    recherches.insertAdjacentHTML('beforeend', htmlContent)
}


//fonction WIP
//généère une alerte WIP
function not_implemented(){
    alert("WIP: function not implemented yet !");
}