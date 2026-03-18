if(localStorage.getItem("loggedIn")!=="true"){

alert("Unauthorized access")

window.location="adminLogin.html"

}

setTimeout(displayEvents,500)

document.getElementById("date").min=new Date().toISOString().split("T")[0]

document.getElementById("eventForm").addEventListener("submit",function(e){

e.preventDefault()

let id=document.getElementById("eventId").value
let name=document.getElementById("eventName").value
let category=document.getElementById("category").value
let date=document.getElementById("date").value
let time=document.getElementById("time").value
let url=document.getElementById("url").value

let today=new Date().toISOString().split("T")[0]

if(date<today){

alert("Event date cannot be past")

return

}

let tx=db.transaction("events","readwrite")

let store=tx.objectStore("events")

store.add({id,name,category,date,time,url})

tx.oncomplete=function(){

alert("Event added")

displayEvents()

}

})

function displayEvents(){

let container=document.getElementById("eventContainer")

container.innerHTML=""

let tx=db.transaction("events","readonly")

let store=tx.objectStore("events")

store.openCursor().onsuccess=function(e){

let cursor=e.target.result

if(cursor){

let event=cursor.value

                            container.innerHTML += `
                                <div class="col-12">
                                    <div class="card-modern p-3">
                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                            <div class="d-flex flex-wrap gap-2">
                                                <span class="category-tag" style="zoom: 0.8">${event.category}</span>
                                                <span class="event-id-tag">#${event.id}</span>
                                            </div>
                                            <button onclick="deleteEvent('${event.id}')" class="btn text-danger p-0" title="Purge Record">
                                                <i class="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>
                                        <h6 class="fw-bold mb-3">${event.name}</h6>
                                        <div class="event-info-box p-2 mb-3">
                                            <div class="small mb-1"><i class="bi bi-calendar2-day text-primary me-2"></i>${event.date}</div>
                                            <div class="small"><i class="bi bi-clock text-primary me-2"></i>${event.time}</div>
                                        </div>
                                        <a href="${event.url}" target="_blank" class="btn-modern btn-modern-primary btn-sm w-100 justify-content-center py-2">
                                            <i class="bi bi-box-arrow-up-right"></i> External Page
                                        </a>
                                    </div>
                                </div>
                            `

cursor.continue()

}

}

}

function deleteEvent(id){

let tx=db.transaction("events","readwrite")

let store=tx.objectStore("events")

store.delete(id)

tx.oncomplete=function(){

displayEvents()

}

}

function searchEvent(){

let type=document.getElementById("searchType").value
let value=document.getElementById("searchInput").value.toLowerCase()

let container=document.getElementById("eventContainer")

container.innerHTML=""

let tx=db.transaction("events","readonly")

let store=tx.objectStore("events")

store.openCursor().onsuccess=function(e){

let cursor=e.target.result

if(cursor){

let event=cursor.value

if(event[type].toLowerCase().includes(value)){

                                            container.innerHTML += `
                                                <div class="col-12">
                                                    <div class="card-modern p-3">
                                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                                            <div class="col-12">
                                                                <div class="d-flex flex-wrap gap-2 mb-2">
                                                                    <span class="category-tag" style="zoom: 0.8">${event.category}</span>
                                                                    <span class="event-id-tag">#${event.id}</span>
                                                                </div>
                                                            </div>
                                                            <button onclick="deleteEvent('${event.id}')" class="btn text-danger p-0">
                                                                <i class="bi bi-trash3-fill"></i>
                                                            </button>
                                                        </div>
                                                        <h6 class="fw-bold mb-2">${event.name}</h6>
                                                        <div class="event-info-box p-2 mb-3">
                                                            <div class="small mb-1"><i class="bi bi-calendar2-day text-primary me-2"></i>${event.date}</div>
                                                            <div class="small"><i class="bi bi-clock text-primary me-2"></i>${event.time}</div>
                                                        </div>
                                                        <a href="${event.url}" target="_blank" class="btn-modern btn-modern-primary btn-sm w-100 justify-content-center py-2">
                                                            <i class="bi bi-link-45deg"></i> Open Link
                                                        </a>
                                                    </div>
                                                </div>
                                            `

}

cursor.continue()

}

}

}

function logout(){

localStorage.removeItem("loggedIn")

window.location="adminLogin.html"

}