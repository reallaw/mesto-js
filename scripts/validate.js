function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
}; 

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  const submitBtn = formElement.querySelector('.form__submit-button');
  inputElement.classList.add('form__input_invalid');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
  submitBtn.classList.add('form__submit-button_disabled');
  submitBtn.setAttribute('disabled', '');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  const submitBtn = formElement.querySelector('.form__submit-button');
  inputElement.classList.remove('form__input_invalid');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
  submitBtn.classList.remove('form__submit-button_disabled');
  submitBtn.removeAttribute('disabled');
}; 

enableValidation();