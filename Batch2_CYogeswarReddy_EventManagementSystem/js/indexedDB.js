const dbName = "UpgradEMS";
let db;

let request = indexedDB.open(dbName, 1);

request.onupgradeneeded = function (event) {

db = event.target.result;

let store = db.createObjectStore("events", { keyPath: "id" });

store.createIndex("name", "name", { unique: false });
store.createIndex("category", "category", { unique: false });

};

request.onsuccess = function (event) {

db = event.target.result;

displayEvents();

};

request.onerror = function () {
console.log("Database error");
};