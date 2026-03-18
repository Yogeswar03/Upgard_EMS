let id=localStorage.getItem("selectedEvent")

setTimeout(loadEvent,500)

function loadEvent(){

let tx=db.transaction("events","readonly")

let store=tx.objectStore("events")

let request=store.get(id)

request.onsuccess=function(){

let e=request.result

document.getElementById("eventId").innerText=e.id
document.getElementById("eventName").innerText=e.name
document.getElementById("eventCategory").innerText=e.category
document.getElementById("eventDate").innerText=e.date
document.getElementById("eventTime").innerText=e.time

}

}

document.getElementById("registerForm").addEventListener("submit",function(e){

e.preventDefault()

alert("You are successfully registered to this event!")

})