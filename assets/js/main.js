// import libraries, packages etc...
import startFirebase from "./firebase.js";

// initiliazes the firebase app (firebase.js) so we can use the functions to access data
startFirebase();

// Placeholder JS that adds click event to enable modal
document.querySelector(".toggle-modal").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("is-active");
});

// Placeholder JS that adds click event to disbale modal
document.querySelector(".delete").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("is-active");
});
