document.getElementById("loginForm").addEventListener("submit",function(e){

e.preventDefault()

let email=document.getElementById("email").value
let password=document.getElementById("password").value

if(email==="yogi@upgrad.com" && password==="Yogi@2502"){

localStorage.setItem("loggedIn","true")

window.location="adminEvents.html"

}

else{

alert("Invalid credentials")

}

})