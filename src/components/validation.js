
//показать ошибку
function showInputError (form, input, settings) {
  input.classList.add(settings.inputErrorClass);

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.add(settings.errorClass);
  inputError.textContent = input.validationMessage;

}


//убрать ошибку
function hideInputError (form, input, settings) {
  input.classList.remove(settings.inputErrorClass);

  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.classList.remove(settings.errorClass);
  inputError.textContent = '';
}

//переключалка ошибки
function isValid (form, input, settings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  }
  else {
    input.setCustomValidity("");
  };
 if (!input.validity.valid) {
  showInputError(form, input, settings);
 }
 else {
  hideInputError (form, input, settings);

 }
}

//раскидать на все инпуты формы
function addFormEventListeners (form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  toggleButtonState (form, inputs, settings); 
    inputs.forEach ((input) => {
    input.addEventListener('input', function () {
      isValid (form, input, settings);
      toggleButtonState (form, inputs, settings); 
    });
  });
}

//раскидать на все формы документа
export function enableValidation (settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    addFormEventListeners (form, settings);
  });
}




//проверялка, все ли в списке инпутов валидно
function hasInvalidInput (inputList) {
  return Array.from(inputList).some( (item) => {
      return !item.validity.valid
  })
};


//переключалка кнопки
function toggleButtonState (form, inputList, settings)  {
  const button = form.querySelector(settings.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    button.setAttribute('disabled','');
    button.classList.add(settings.inactiveButtonClass);
  } 
  else {
    button.removeAttribute('disabled','');
    button.classList.remove(settings.inactiveButtonClass);
  }
}

// очистка ошибок валидации вызовом clearValidation - очищает ошибки валидации формы и делает кнопку неактивной

export function clearValidation (form, settings) {
  const inputList = form.querySelectorAll(settings.inputSelector);
  inputList.forEach( function (input) {
    hideInputError (form, input, settings);
  });
  toggleButtonState (form, inputList, settings); 
}
