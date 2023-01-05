function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
});

function setEventListeners(config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(config, formElement, inputElement);
    });
  isValid(config, formElement, inputElement);
  });
}; 

function isValid(config, formElement, inputElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
    toggleSubmitBtn(config, formElement, inputList);
  } else {
    hideInputError(config, formElement, inputElement);
    toggleSubmitBtn(config, formElement, inputList);
  }
}; 

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

function showInputError(config, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

function toggleSubmitBtn(config, formElement, inputsList) {
  const submitBtn = formElement.querySelector(config.submitButtonSelector);

  if (!hasInvalidInput(inputsList)) {
    submitBtn.classList.remove(config.inactiveButtonClass);
    submitBtn.removeAttribute('disabled', '');
  } else {
    submitBtn.classList.add(config.inactiveButtonClass);
    submitBtn.setAttribute('disabled', '');
  }
};

function hideInputError(config, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

enableValidation(enableValidation);