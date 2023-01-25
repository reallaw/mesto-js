export default class FormValidator {
  constructor(config, form) {
    this._config = config; // Получаем конфиг
    this._form = form; // Получаем форму
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  };

  _setEventListeners() {
    this._toggleBtnState(this._inputsList)

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleBtnState();
      });
    });
  };
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 

  _hasInvalidInput () {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  _toggleBtnState() {
    if (!this._hasInvalidInput(this._inputsList)) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', '');
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  resetValidation() {
    this._toggleBtnState();

    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  };
};
 