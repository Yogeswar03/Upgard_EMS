document.getElementById("contactForm").addEventListener("submit",function(e){

e.preventDefault()

alert("Query submitted successfully")
document.getElementById("contactForm").reset()
})