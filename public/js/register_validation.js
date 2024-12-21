
let username_regex = /^[a-zA-Z]+$/;
let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


document.querySelector(".username").addEventListener("keyup",check_username);
document.querySelector(".email").addEventListener("keyup", check_email);
document.querySelector(".password").addEventListener("keyup", check_password);
document.querySelector(".confirm").addEventListener("keyup", check_confirm);


document.querySelector(".username").addEventListener("keydown", (e) => prevent_whitespace(e))
document.querySelector(".email").addEventListener("keydown", (e) => prevent_whitespace(e))
document.querySelector(".password").addEventListener("keydown", (e) => prevent_whitespace(e))
document.querySelector(".confirm").addEventListener("keydown", (e) => prevent_whitespace(e))



document.querySelector("form").addEventListener("submit", (e) => {
    if(!check_username() , !check_email() , !check_password() , !check_confirm()){
        e.preventDefault();
    }
})


function check_username(){
    let username = document.querySelector(".username").value;
    if(username_regex.test(username)) {
        document.querySelector(".username").classList.remove("error");
        return true;
    } else {
        document.querySelector(".username").classList.add("error");
        return false;
    }
}

function check_email(){
    let email = document.querySelector(".email").value;
    if(email_regex.test(email)) {
        document.querySelector(".email").classList.remove("error");
        return true;
    } else {
        document.querySelector(".email").classList.add("error");
        return false;
    }
}
function check_password(){
    let password = document.querySelector(".password").value;
    if(password.length < 8) {
        document.querySelector(".password").classList.add("error");    
        return false;
    } else {
        document.querySelector(".password").classList.remove("error");
        return true;
    }
}

function check_confirm(){
    let password = document.querySelector(".password").value;
    let confirm = document.querySelector(".confirm").value;
    if(password != confirm) {
        document.querySelector(".confirm").classList.add("error");   
        return false; 
    } else {
        document.querySelector(".confirm").classList.remove("error");
        return true;
    }
}

function prevent_whitespace(e){
    if(e.key == " "){
        e.preventDefault();
    }
}