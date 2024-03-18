import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
contactMe = document.querySelectorAll('[href="#contact"]');

contactMe.forEach((el) => {
  el.addEventListener("click", function (e) {
    // Have to write code to scroll smoothly to contact section
  });
});
