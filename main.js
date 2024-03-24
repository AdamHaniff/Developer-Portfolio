// import "core-js/stable";
// import "regenerator-runtime/runtime";

// VARIABLES
const contactMe = document.querySelectorAll('[href="#contact"]');
const contactSection = document.querySelector(".contact");
const form = document.querySelector(".form");
const formInputs = document.querySelectorAll(".form__input");

// FUNCTIONS
function removeElements(elementsClass) {
  const elements = document.querySelectorAll(elementsClass);

  if (elements) {
    for (let el of elements) {
      el.remove();
    }
  }
}

function resetFormValidation() {
  // If any 'form__error-icon' is currently being displayed, remove it
  removeElements(".form__error-icon");

  // Remove any dynamic classes added to 'form__input-error-icon' elements
  const formInputErrorIconElements = document.querySelectorAll(
    ".form__input-error-icon"
  );

  for (let el of formInputErrorIconElements) {
    el.classList.remove(
      "form__input-error-icon--error",
      "form__input-error-icon--success"
    );
  }

  // If any 'form__error' element is currently being displayed, remove it
  removeElements(".form__error");
}

function changeInputErrorBorder(input, classToAdd) {
  const formInputErrorIcon = input.closest(".form__input-error-icon");
  formInputErrorIcon.classList.add(classToAdd);
}

function insertErrorIcon(input) {
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
}

function insertFormError(input, errorMessage) {
  const formInputContainer = input.closest(".form__input-container");
  const formErrorHTML = `<span class="form__error">${errorMessage}</span>`;
  formInputContainer.insertAdjacentHTML("beforeend", formErrorHTML);
}

function displayError(input, errorMessage) {
  insertErrorIcon(input);

  // Change border-bottom of 'form__input-error-icon to #ff6f5b
  changeInputErrorBorder(input, "form__input-error-icon--error");

  // Create error message and insert it
  insertFormError(input, errorMessage);
}

function validateInput(isNotValid, isValid, input, inputValue) {
  if (isNotValid && inputValue !== "") {
    displayError(input, "Sorry, invalid format here");
  }

  if (isValid) {
    // Change 'form__input-error-icon' border-bottom to #4ee1a0
    changeInputErrorBorder(input, "form__input-error-icon--success");
  }

  return isNotValid;
}

function isNameNotValid() {
  const nameInput = formInputs[0];
  const nameValue = nameInput.value.trim();
  const isNotValid =
    !/^[A-Za-z\-\'\s]+$/.test(nameValue) || nameValue.length > 50;
  const isValid = !isNotValid;

  // Display error or success depending on the validity of name input
  return validateInput(isNotValid, isValid, nameInput, nameValue);
}

function isEmailNotValid() {
  const emailInput = formInputs[1];
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNotValid = !emailRegex.test(emailValue);
  const isValid = !isNotValid;

  // Display error or success depending on the validity of email input
  return validateInput(isNotValid, isValid, emailInput, emailValue);
}

function checkMessageValidity(input) {
  // If the message input is not empty, change its 'form__input-error-icon' border-bottom to #4ee1a0
  const messageInput = formInputs[2];
  const messageValue = messageInput.value.trim();

  if (input === messageInput && messageValue !== "") {
    changeInputErrorBorder(messageInput, "form__input-error-icon--success");
  }
}

function isAnyInputEmpty() {
  for (let input of formInputs) {
    if (input.value === "") return true;
  }
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleFormSubmit(e) {
  // Prevent default form submission behavior
  e.preventDefault();

  // Remove any error elements and dynamic classes that were added
  resetFormValidation();

  for (let input of formInputs) {
    // Check if any of the inputs are empty
    if (input.value === "") displayError(input, "Sorry, can't be empty");

    // Check if the message is not an empty string
    checkMessageValidity(input);
  }

  // Do not submit the form if the name or email is not valid
  if (isNameNotValid()) {
    isEmailNotValid();
    return;
  }

  if (isEmailNotValid()) return;

  // After checking all inputs, prevent form submission if any input is empty
  if (isAnyInputEmpty()) return;

  // If all inputs are valid, submit the form
  form.submit();

  // Reset all input fields
  form.reset();
}

function handleContactMeClick(e) {
  // Prevent the default behavior of the anchor link
  e.preventDefault();

  // Scroll smoothly to the contact section
  contactSection.scrollIntoView({ behavior: "smooth" });
}

// EVENT LISTENERS
form.addEventListener("submit", handleFormSubmit);
contactMe.forEach((el) => el.addEventListener("click", handleContactMeClick));
