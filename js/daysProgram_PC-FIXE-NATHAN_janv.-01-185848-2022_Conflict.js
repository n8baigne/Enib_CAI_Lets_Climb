//--------------------------------------------------------

var currentIcons = new ClimbEvents(false, false, false, false);


const displayDateSpace = document.getElementById("dateCol");
const displayIconsSpace = document.getElementById("iconsCol");
const displayUserRequestsSpace = document.getElementById("userRequests");
const displayUserPropositionsSpace = document.getElementById("userPropositions");

//--------------------------------------------------------

function displayDate() {
    let date = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate();
    displayDateSpace.innerHTML = date;
}

function initIcons() {

    let tmpList = userPropositions.concat(userRequests);
    tmpList.filter(v => v.date.getDate() == selectedDate.getDate()).forEach((item, index) => {
        if (item.totalParticipants === item.participants && !(item.type == ClimbEvents.ASKED || item.type == ClimbEvents.SUGGESTED)) {
            currentIcons.complete = true;
        }

        if (item.totalParticipants != item.participants && !(item.type == ClimbEvents.ASKED || item.type == ClimbEvents.SUGGESTED)) {
            currentIcons.incomplete = true;
        }

        if (item.type == ClimbEvents.ASKED) {
            currentIcons.asked = true;
        }

        if (item.type == ClimbEvents.SUGGESTED) {
            currentIcons.suggested = true;
        }
    });
}

function displayIcons() {
    if (currentIcons.incomplete) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon redBackground\"></span>  ";
    }
    if (currentIcons.complete) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon greenBackground\"></span>  ";
    }
    if (currentIcons.asked) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon blackBackground\"></span>  ";
    }
    if (currentIcons.suggested) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon cyanBackground\"></span>  ";
    }
}

function displayUserRequests() {
    userRequests.filter(v => v.date.getDate() == selectedDate.getDate()).sort((a, b) => (a.date > b.date) ? 1 : -1).forEach((item, index) => {
        //to make an element active : .active
        let date = item.date.getHours() + "h" + item.date.getMinutes()
        inTxt = "<div class=\"list-group-item list-group-item-action flex-column align-items-start\">\
                <div class=\"row align-items-center\">\
                    <div class=\"col\">\
                        <a href=\"https://getbootstrap.com/docs/5.0/examples/cheatsheet/\"><img class=\"profilePicStyle\" src=\"./img/blankProfile.png\" alt=\"Blank profile pic\"/></a>\
                    </div>\
                    <div class=\"col-md\">\
                        <div class=\"row dateStyle\">\
                            " + date + "\
                        </div>\
                    </div>\
                    <div class=\"col\">\
                        <div class=\"row\">\
                            Lieu\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + (item.place == 0 ? "-" : item.place) + "\
                        </div>\
                    </div>\
                    \
                    <div class=\"col\">\
                        <div class=\"row\">\
                            Matériel\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + (item.gear == 0 ? "-" : item.gear) + "\
                        </div>\
                    </div>\
                    \
                    <div class=\"col\">\
                        <div class=\"row\">\
                            Niveau\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + (item.level == 0 ? "-" : item.level) + "\
                        </div>\
                    </div>\
                    \
                    <div class=\"col float-end\">\
                        <div class=\"row\">\
                            <span class=\"roundIcon " + (item.totalParticipants == item.participants ? "greenBackground" : "redBackground") + "\"></span>\
                        </div>\
                        <div class=\"row float-end overflow-auto\">\
                            <span>" + item.participants + "/" + item.totalParticipants + "</span>\
                        </div>\
                    </div>\
                </div>\
            </div></div>";

        displayUserRequestsSpace.innerHTML += inTxt;
    })
}

function displayUserPropositions() {
    userPropositions.filter(v => v.date.getDate() == selectedDate.getDate()).sort((a, b) => (a.date > b.date) ? 1 : -1).forEach((item, index) => {
        //to make an element active : .active
        // console.log(item.type);
        let date = item.date.getHours() + "h" + item.date.getMinutes()
        inTxt = "<div class=\"list-group-item list-group-item-action flex-column align-items-start\">\
                <div class=\"row align-items-center\">\
                    <div class=\"col\">\
                        <a href=\"https://getbootstrap.com/docs/5.0/examples/cheatsheet/\"><img class=\"profilePicStyle\" src=\"./img/blankProfile.png\" alt=\"Blank profile pic\"/></a>\
                    </div>\
                    <div class=\"col-md\">\
                        <div class=\"row smallDateStyle\">\
                            " + date + "\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + item.user + "\
                        </div>\
                    </div>\
                    <div class=\"col\">\
                        <div class=\"row\">\
                            Lieu\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + (item.place == 0 ? "-" : item.place) + "\
                        </div>\
                    </div>\
                    \
                    <div class=\"col\">\
                        <div class=\"row\">\
                            Matériel\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + (item.gear == 0 ? "-" : item.gear) + "\
                        </div>\
                    </div>\
                    \
                    <div class=\"col\">\
                        <div class=\"row\">\
                            Niveau\
                        </div>\
                        <div class=\"row form-control overflow-auto\">\
                            " + (item.level == 0 ? "-" : item.level) + "\
                        </div>\
                    </div>\
                    \
                    <div class=\"col float-end\">\
                        <div class=\"row\">\
                            <span class=\"roundIcon " + (item.type == ClimbEvents.ASKED ? "blackBackground" : (item.type == ClimbEvents.SUGGESTED ? "cyanBackground" : "")) + "\"></span>\
                        </div>\
                        <div class=\"row float-end overflow-auto\">\
                            <span>" + item.participants + "/" + item.totalParticipants + "</span>\
                        </div>\
                    </div>\
                </div>\
            </div></div>";
        displayUserPropositionsSpace.innerHTML += inTxt;
    })
}

initIcons();

displayDate();
displayIcons();

displayUserRequests();
displayUserPropositions();