
function toggleButtonProfile(){
    
    const button = document.getElementById('profileButton');   
     if(button.innerHTML== "Enregistrer"){
        document.getElementById("fieldset").disabled = true;
        button.innerHTML= "Editer"
     }
     else{
        button.innerHTML= "Enregistrer"
        document.getElementById("fieldset").disabled = false;
        //document.getElementById("picture").innerHTML = "<input type='file' class='form-control' id='picture'>";
     }
}