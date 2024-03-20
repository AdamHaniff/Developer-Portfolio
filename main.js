import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const contactMe = document.querySelectorAll('[href="#contact"]');
const contactSection = document.querySelector(".contact");
const sendMessageBtn = document.querySelector(".form__btn");
const nameInput = document.querySelector('[name="name"]');
const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');

// EVENT LISTENER CALLBACK FUNCTION
function scrollToContactSection(e) {
  // Prevent the default behavior of the anchor link
  e.preventDefault();
  // Scroll smoothly to the contact section
  contactSection.scrollIntoView({ behavior: "smooth" });
}

// EVENT LISTENERS
contactMe.forEach((el) => el.addEventListener("click", scrollToContactSection));
sendMessageBtn.addEventListener("submit", function (e) {});
