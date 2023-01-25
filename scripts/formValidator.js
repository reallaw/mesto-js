export default class FormValidator {
  constructor(config) {
    this._config = config; // Получаем конфиг
  };

  _setEventListeners(formElement) {
    const inputsList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    
    this.toggleBtnState(formElement, inputsList)
  
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this.toggleBtnState(formElement, inputsList);
      });
    });
  };
  
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }; 

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  toggleBtnState(formElement, inputsList) {
    const submitBtn = formElement.querySelector(this._config.submitButtonSelector);
  
    if (!this._hasInvalidInput(inputsList)) {
      submitBtn.classList.remove(this._config.inactiveButtonClass);
      submitBtn.removeAttribute('disabled', '');
    } else {
      submitBtn.classList.add(this._config.inactiveButtonClass);
      submitBtn.setAttribute('disabled', '');
    }
  };

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));
  
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  };
}