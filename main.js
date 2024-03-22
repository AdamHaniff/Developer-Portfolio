// import "core-js/stable";
// import "regenerator-runtime/runtime";

// VARIABLES
const contactMe = document.querySelectorAll('[href="#contact"]');
const contactSection = document.querySelector(".contact");
const form = document.querySelector(".form");
const formInputs = document.querySelectorAll(".form__input");

// HELPER FUNCTIONS
function changeInputErrorBorder(input, classToAdd) {
  const formInputErrorIcon = input.closest(".form__input-error-icon");
  formInputErrorIcon.classList.add(classToAdd);
}

function displayError(input, errorMessage) {
  // Insert error icon
  const errorIconHTML = `<svg
  class="form__error-icon"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
>
  <circle cx="12" cy="12" r="11.5" stroke="#FF6F5B" />
  <rect x="11" y="6" width="2" height="9" rx="1" fill="#FF6F5B" />
  <rect x="11" y="17" width="2" height="2" rx="1" fill="#FF6F5B" />
</svg>`;

  input.insertAdjacentHTML("afterend", errorIconHTML);

  // Insert form error
  const formInputContainer = input.closest(".form__input-container");
  const formErrorHTML = `<span class="form__error">${errorMessage}</span>`;
  formInputContainer.insertAdjacentHTML("beforeend", formErrorHTML);

  // Change border-bottom of 'form__input-error-icon to #ff6f5b
  changeInputErrorBorder(input, "form__input-error-icon--error");
}

function isNameNotValid() {
  const nameInput = formInputs[0];
  const nameValue = nameInput.value.trim();
  const isNotValid =
    !/^[A-Za-z\-\'\s]+$/.test(nameValue) || nameValue.length > 50;
  const isValid = !isNotValid;

  if (isNotValid && nameValue !== "") {
    displayError(nameInput, "Sorry, invalid format here");
  }

  if (isValid) {
    // Change 'form__input-error-icon' border-bottom to #4ee1a0
    changeInputErrorBorder(nameInput, "form__input-error-icon--success");
  }

  return isNotValid;
}

function isEmailNotValid() {
  const emailInput = formInputs[1];
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNotValid = !emailRegex.test(emailValue);
  const isValid = !isNotValid;

  if (isNotValid && emailValue !== "") {
    displayError(emailInput, "Sorry, invalid format here");
  }

  if (isValid) {
    // Change 'form__input-error-icon' border-bottom to #4ee1a0
    changeInputErrorBorder(emailInput, "form__input-error-icon--success");
  }

  return isNotValid;
}

// EVENT LISTENER CALLBACK FUNCTION
function scrollToContactSection(e) {
  // Prevent the default behavior of the anchor link
  e.preventDefault();
  // Scroll smoothly to the contact section
  contactSection.scrollIntoView({ behavior: "smooth" });
}

// EVENT LISTENERS
contactMe.forEach((el) => el.addEventListener("click", scrollToContactSection));

form.addEventListener("submit", function (e) {
  // Prevent default form submission behavior
  e.preventDefault();

  for (let input of formInputs) {
    // Check if any of the inputs are empty
    if (input.value === "") displayError(input, "Sorry, can't be empty");

    // If the message input is not empty, change its 'form__input-error-icon' border-bottom to #4ee1a0
    const messageInput = formInputs[2];
    const messageValue = messageInput.value.trim();

    if (input === messageInput && messageValue !== "") {
      changeInputErrorBorder(messageInput, "form__input-error-icon--success");
    }
  }

  // Do not submit the form if the name or email is not valid
  if (isNameNotValid() || isEmailNotValid()) return;

  // After checking all inputs, prevent form submission if any input is empty
  for (let input of formInputs) {
    if (input.value === "") return;
  }
});
