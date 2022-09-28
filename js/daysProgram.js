//--------------------------------------------------------

var lastSelectedClimbSessionItem = null;
var lastSelectedClimbSessionItemIndex = null;
var lastSelectedClimbSessionList = null;

var currentIcons = new ClimbEvents(false, false, false, false);


var displayDateSpace = document.getElementById("dateCol");
var displayIconsSpace = document.getElementById("iconsCol");
var displayUserRequestsSpace = document.getElementById("userRequests");
var displayUserPropositionsSpace = document.getElementById("userPropositions");
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
    displayIconsSpace.innerHTML = "";

    if (currentIcons.incomplete) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon redBackground\"></span>";
    }
    if (currentIcons.complete) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon greenBackground\"></span>";
    }
    if (currentIcons.asked) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon blackBackground\"></span>";
    }
    if (currentIcons.suggested) {
        displayIconsSpace.innerHTML += "<span class=\"roundIcon cyanBackground\"></span>";
    }
}

function dpEventDispatcher(category = String,index = Number) {
    // console.log("HEY");
    if(category == "userRequest")
    {
        // console.log("User request : ",index);
        onClickUserRequest(index);
    }
    else if(category == "userProposition")
    {
        // console.log("User proposition : ",index);
        onClickUserProposition(index);
    }
    else
    {
        throw "click event category on day's program page UNKNOWN";
    }
}

function getInnerHtmlClimbSessionListElement(item = ClimbSession,index = Number,category = String)
{
    //to make an element active : .active
    // console.log(item.type);
    let date = item.date.getHours() + "h" + item.date.getMinutes()
    let txt =
    "<div class=\"list-group-item list-group-item-action flex-column align-items-start\" onclick=\"dpEventDispatcher('"+category+"',"+index+")\">\
        <div class=\"row align-items-center\">\
            <div class=\"col\">\
                <a href=\"https://getbootstrap.com/docs/5.0/examples/cheatsheet/\"><img class=\"profilePicStyle photo_profil\" src=\""+ item.user.profilePic + "\" alt=\"Blank profile pic\"/></a>\
            </div>\
            <div class=\"col-md\">\
                <div class=\"row smallDateStyle\">\
                    " + date + "\
                </div>"+( item.user.name == "" ? "" :"\
                <div class=\"row form-control overflow-auto\">\
                    " + item.user.name + "\
                </div>")+"\
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
                    <span class=\"roundIcon " + (item.type == ClimbEvents.ASKED ? "blackBackground" : (item.type == ClimbEvents.SUGGESTED ? "cyanBackground" : (item.totalParticipants == item.participants ? "greenBackground" : "redBackground"))) + "\"></span>\
                </div>\
                <div class=\"row float-end overflow-auto\">\
                    <span>" + item.participants + "/" + item.totalParticipants + "</span>\
                </div>\
            </div>\
        </div>\
    </div>";
    return txt;
}

function displayUserRequests() {
    displayUserRequestsSpace.innerText = "";
    userRequests.filter(v => v.date.getDate() == selectedDate.getDate()).sort((a, b) => (a.date > b.date) ? 1 : -1).forEach((item, index) => {
        //to make an element active : .active
        inTxt = getInnerHtmlClimbSessionListElement(item,index,"userRequest");

        displayUserRequestsSpace.innerHTML += inTxt;
    });
}

function displayUserPropositions() {
    displayUserPropositionsSpace.innerText = "";
    userPropositions.filter(v => v.date.getDate() == selectedDate.getDate())
        .filter(v => v.participants != v.totalParticipants)
        .sort((a, b) => (a.date > b.date) ? 1 : -1)
        .forEach((item, index) => {
        inTxt = getInnerHtmlClimbSessionListElement(item,index,"userProposition");
        displayUserPropositionsSpace.innerHTML += inTxt;
    });
}


function onClickUserRequest(index)
{
    let item = userRequests[index];
    console.log("User request : ", item)
    lastSelectedClimbSessionItem = item;
    lastSelectedClimbSessionItemIndex = index;
    lastSelectedClimbSessionList = userRequests;

    // $("#modalAction").modal()
    let joinBtn = document.getElementById("modalBtnJoin");
    joinBtn.setAttribute("disabled","true");
    $("#modalAction").modal("toggle")
}

function onClickUserProposition(index)
{
    let item = userPropositions[index];
    console.log("User proposition : ", item);
    lastSelectedClimbSessionItem = item;
    lastSelectedClimbSessionItemIndex = index;
    lastSelectedClimbSessionList = userPropositions;

    let joinBtn = document.getElementById("modalBtnJoin");
    joinBtn.removeAttribute("disabled");

    $("#modalAction").modal("toggle")
}

/*
    Action ids:
    0 - Cancel
    1 - Delete
    2 - Join
    3 - 
*/
function onClickActionModal(action)
{
    if(action == 1) //delete action
    {
        lastSelectedClimbSessionList.splice(lastSelectedClimbSessionItemIndex,1);
    }
    else if(action == 2)
    {
        lastSelectedClimbSessionItem.participants += 1;
        lastSelectedClimbSessionItem.type = ClimbEvents.UNKNOWN;
        userRequests.push(lastSelectedClimbSessionItem);
        lastSelectedClimbSessionList.splice(lastSelectedClimbSessionItemIndex,1);
    }

    if(action == 0)
    {
        
    }
    else//if some list modification was done
    {
        displayUserRequests();
        displayUserPropositions();
        console.log("Refresh lists");
    }

    $("#modalAction").modal("toggle");
}