// Navbar toggler implementation
document.addEventListener("DOMContentLoaded", () => {
  const burgerIcon = document.querySelector("#burger-icon");
  const navLinks = document.querySelector("#nav-links");

  // Add "is-active" class to navLinks & burgerIcon to change default Bulma utility display states on click of burger-icon
  burgerIcon.addEventListener("click", () => {
    navLinks.classList.toggle("is-active");
    burgerIcon.classList.toggle("is-active");
  });
});
