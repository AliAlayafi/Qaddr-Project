

document.querySelector("#new-password").addEventListener("keyup", check_password);
document.querySelector("#new-password").addEventListener("keydown", (e) => prevent_whitespace(e))


document.querySelector("#confirm-password").addEventListener("keyup", check_confirm);
document.querySelector("#confirm-password").addEventListener("keydown", (e) => prevent_whitespace(e))

function check_password(){
    let password = document.querySelector("#new-password").value;
    if(password.length < 8) {
        document.querySelector("#new-password").classList.add("error");    
        return false;
    } else {
        document.querySelector("#new-password").classList.remove("error");
        return true;
    }
}

function check_confirm(){
    let password = document.querySelector("#new-password").value;
    let confirm = document.querySelector("#confirm-password").value;
    if(password != confirm){
        document.querySelector("#confirm-password").classList.add("error");  
    }else{
        document.querySelector("#confirm-password").classList.remove("error");
    }
}

document.querySelector("form").addEventListener("submit", (e) => {
    let password = document.querySelector("#new-password").value;
    let confirm = document.querySelector("#confirm-password").value;
    if(password != confirm){
        e.preventDefault();
        document.querySelector("#confirm-password").classList.add("error");  
    }
})
function prevent_whitespace(e){
    if(e.key == " "){
        e.preventDefault();
    }
}