//Variable et class

//--------------------------------------------------------

class ClimbEvents {
    static UNKNOWN = -1;
    static ASKED = 2;
    static SUGGESTED = 3;
    constructor(incomplete = Boolean, complete = Boolean, asked = Boolean, suggested = Boolean) {
        this.incomplete = incomplete,
            this.complete = complete,
            this.asked = asked,
            this.suggested = suggested
    }
}

class User{
    constructor(name = String, profilePic = "./img/blankProfile.png")
    {
        this.name = name,
        this.profilePic = profilePic
    }
}

class ClimbSession {
    constructor(user = String, date = Date, place = String, gear = String, level = String, participants = Number, totalParticipants = Number, type = ClimbEvents.UNKNOWN) {
            this.user = new User(user),
            this.date = date,
            this.place = place,
            this.gear = gear,
            this.level = level,
            this.participants = participants,
            this.totalParticipants = totalParticipants,
            this.type = type
    }
}



//Functions
//--------------------------------------------------------
function navigateToHome() {
    $("#content").html("");
    $("#content").load("./src/home.html");
    changeActiveLink("Accueil");
}

function navigateToDay() {
    $("#content").html("");
    $("#content").load("./src/daysProgram.html");
    changeActiveLink("Accueil");
}

function navigateToProfile() {
    $("#content").html("");
    $("#content").load("./src/profile.html");
    changeActiveLink("Profil");
}

function navigateToLocation() {
    $("#content").html("");
    $("#content").load("./src/location_materiel.html");
    changeActiveLink("Location");
}

function navigateToRecherche() {
    $("#content").html("");
    $("#content").load("./src/recherche_partenaire.html");
    changeActiveLink("Recherche");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeActiveLink(pageName) {
    var links = $('.nav-header-link');
    $.each(links, function(key, value) {
        $(this).removeClass('active');
        if (value.innerHTML == pageName) {
            $(this).addClass('active');
        }

    });
}

//--------------------------------------------------------
//Variable pour l'erreur d'acc??s fichiers locaux
var htmlErrorTextFilesAccessError = "<div class=\"row\"><div class=\"col-md-12\"><div class=\"error-template text-center\"><h1>Oops!</h1><h2>404 Not Found</h2><div class=\"error-details\">D??sol??, une erreur s'est produite ! Le contenu html ne peut pas se charger si le navigateurn'autorise pas l'acc??s au r??pertoir local.</div><h2 style=\"margin-top: 75px;\">Solution :</h2><div class=\"list-group\"><li href=\"#\" class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"row justify-content-start\"><div class=\"col-auto offset-2\"><div class=\"d-flex w-100 justify-content-between\"><h6 class=\"mb-1 ml-12\">Avec Chrome <i class=\"fab fa-chrome fa-1x\"></i> :</h6></div></div><div class=\"error-details\">Lancer l'application depuis le terminal via la lignedecommande : <i class=\"fab fa-windows fa-1x\"></i> <i class=\"fas fa-arrow-right fa-1x\"></i> <code>&lt;start chrome -allow-file-access-from-files&gt;</code><br/><i class=\"fab fa-linux fa-1x\"></i> <i class=\"fas fa-arrow-right fa-1x\"></i> <code>&lt;google-chrome -allow-file-access-from-files&gt;</code><br/>(Veillez ?? ce que Chrome soit compl??tement ferm??avant de lancer la commande)</div></div></li><li href=\"#\" class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"row justify-content-start\"><div class=\"col-auto offset-2\"><div class=\"d-flex w-100 justify-content-between\"><h6 class=\"mb-1 ml-12\">Avec Edge <i class=\"fab fa-edge fa-1x\"></i> :</h6></div></div><div class=\"error-details\">Lancer l'application depuis le terminal via la lignedecommande : <code>&lt;start msedge -allow-file-access-from-files&gt;</code><br/>(Veillez ?? ce que Edge soit compl??tement ferm??avant de lancer la commande)</div></div></li><li  href=\"about:config\" target=\"_blank\" class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"row justify-content-start\"><div class=\"col-auto offset-2\"><div class=\"d-flex w-100 justify-content-between\"><h6 class=\"mb-1 ml-12\">Avec Firefox <i class=\"fab fa-firefox fa-1x\"></i> :</h6></div></div><div class=\"error-details\">Se rendre ?? cette url :  <u>about:config</u><br/>Puis rechercher le param??tre <kbd>privacy.file_unique_origin</kbd> et le passer ?? <kbd>false</kbd> en double cliquant dessus</div></div></li></div></div></div></div>";

//Variables calendrier

var currentDate = new Date();
var currentDate1 = new Date();
currentDate1.setDate(currentDate.getDate() + 1);
var modifiedCurrentDate = new Date();
var userRequests = [
    new ClimbSession("", currentDate, "P0", "2 matelas", "Facile", 1, 2),
    new ClimbSession("", currentDate, "Mur", "", "Moyen", 2, 2),
    new ClimbSession("", currentDate, "Falaise", "", "Inconscient", 2, 3),
    new ClimbSession("", currentDate, "PAS affich??", "", "Non plus", 2, 2),
    new ClimbSession("", currentDate1, "P0", "2 matelas", "Facile", 1, 2),
    new ClimbSession("", currentDate1, "Mur", "", "Moyen", 2, 2),
    new ClimbSession("", currentDate1, "Falaise", "", "Inconscient", 2, 3),
    new ClimbSession("", currentDate1, "PAS affich??", "", "Non plus", 2, 2)
]

var userPropositions = [
    new ClimbSession("Martin BERNARD", currentDate, "Mur1", "", "Facile", 1, 2, ClimbEvents.ASKED),
    new ClimbSession("Antoine LE GOFF", currentDate, "Je sais pas", "", "Moyen", 1, 3, ClimbEvents.SUGGESTED),
    new ClimbSession("Inconnu", currentDate, "PAS affich??", "", "Non plus", 2, 2, ClimbEvents.ASKED)
]

/*
var userRequests = []
var userPropositions = []


for (let i = -30; i < 30; i++) {
    modifiedCurrentDate = new Date();
    modifiedCurrentDate.setDate(currentDate.getDate() + i);
    for (let j = 0; j < getRandomInt(4); j++) {
        userRequests.push(new ClimbSession("", modifiedCurrentDate, "P0", "2 matelas", "Facile", 1, 2));
    }
    for (let k = 0; k < getRandomInt(4); k++) {
        userPropositions.push(new ClimbSession("Antoine LE GOFF", modifiedCurrentDate, "Je sais pas", "", "Moyen", 2, 2, ClimbEvents.SUGGESTED));
    }
}

*/


var selectedDate = new Date();
var eventList = [];