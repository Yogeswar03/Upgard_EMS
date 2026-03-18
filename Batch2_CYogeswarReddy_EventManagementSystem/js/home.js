/*
==================================================
Home Page Script
File: home.js

Purpose:
Load events from IndexedDB and display them
on the home page as Bootstrap cards.

Also handles event registration redirection.
==================================================
*/


/*
--------------------------------------
Wait for IndexedDB to initialize
--------------------------------------
We delay loading events slightly to
ensure the database connection from
indexedDB.js is ready.
*/

setTimeout(loadEvents, 500);



/*
--------------------------------------
Load Events from IndexedDB
--------------------------------------
This function retrieves all events
from the "events" object store and
displays them on the home page.
*/

function loadEvents(){

let container = document.getElementById("eventList")

container.innerHTML = ""

let tx = db.transaction("events","readonly")

let store = tx.objectStore("events")

store.openCursor().onsuccess = function(e){

let cursor = e.target.result

if(cursor){

let event = cursor.value

container.innerHTML += `

                            <div class="col-12 col-md-6 col-lg-4">
                                <div class="card-modern border-0">
                                    <div class="card-header-clean d-flex justify-content-between">
                                        <span class="category-tag">${event.category}</span>
                                        <span class="event-id-tag">${event.id}</span>
                                    </div>
                                    <div class="card-body p-4">
                                        <h4 class="h5 mb-4 text-heading">${event.name}</h4>
                                        <div class="d-flex flex-column gap-2 mb-4">
                                            <div class="event-info-box d-flex align-items-center gap-2">
                                                <i class="bi bi-calendar3 text-primary"></i>
                                                <span class="small fw-bold">${event.date}</span>
                                            </div>
                                            <div class="event-info-box d-flex align-items-center gap-2">
                                                <i class="bi bi-clock text-primary"></i>
                                                <span class="small fw-bold">${event.time}</span>
                                            </div>
                                        </div>
                                        <button onclick="registerEvent('${event.id}')" class="btn-modern btn-modern-primary w-100 justify-content-center">
                                            <i class="bi bi-pencil-square"></i> Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>


`

cursor.continue()

}

}

}



/*
--------------------------------------
Register Event
--------------------------------------
This function saves the selected event
ID in localStorage and redirects the
user to the event registration page.
*/

function registerEvent(id){

localStorage.setItem("selectedEvent", id)

window.location = "register.html"

}