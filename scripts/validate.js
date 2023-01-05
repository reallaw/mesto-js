function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
};

function setEventListeners(config, formElement) {
  const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  toggleBtnState(config, formElement, inputsList)

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(config, formElement, inputElement);
      toggleBtnState(config, formElement, inputsList);
    });
  });
}; 

function isValid(config, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
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

function toggleBtnState(config, formElement, inputsList) {
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