// Selección de elementos del formulario de contacto
// (Inputs, textarea, formulario y mensaje de éxito)
const emailForm = document.querySelector('.email');
const nameForm = document.querySelector('.name');
const lastnameForm = document.querySelector('.lastname');
const messageForm = document.querySelector('.text-message');
const form = document.getElementById('formulary');
const successMessage = document.querySelector('.success-message');

///////////////////////////////////////////////////////////////////////
///////////////// FUNCIONES AUXILIARES DE VALIDACIÓN //////////////////
///////////////////////////////////////////////////////////////////////

// Función para verificar si un campo está vacío
const isEmpty = (field) => {
    return !field.value.trim().length;
}

// Funcion para verificar si el campo tiene entre 3 y 35 caracteres
const isBetween = (input) => {
    return input.value.trim().length >= 3 && input.value.trim().length <= 35;
}

// Función para verificar si un campo tiene un email válido 
const isEmailValid = (input) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return regex.test(input.value.trim());
}

///////////////////////////////////////////////////////////////////////
/////////////////// FUNCIONES DE ERROR Y EXITO ////////////////////////
///////////////////////////////////////////////////////////////////////

const showError = (field, message) => {
    const formField = field;
    const msg = formField.parentElement.querySelector('small');
    msg.innerText = message;
    msg.style.display = 'block';
    msg.style.color = 'red';
    formField.classList.remove('success');
    formField.classList.add('error');
};

const showSuccess = (field) => {
    const formField = field;
    const msg = formField.parentElement.querySelector('small');
    msg.innerText = '';
    msg.style.display = 'none';
    formField.classList.remove('error');
    formField.classList.add('success');
};

export const showSuccessSendForm = () => {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
};

///////////////////////////////////////////////////////////////////////
////////////////////// VALIDACIÓN DE CAMPOS ///////////////////////////
///////////////////////////////////////////////////////////////////////

// Función para validar el input de texto
const checkTextInput = (input) => {
    let valid = false;

    if (isEmpty(input)) {
        showError(input, 'El campo no puede estar vacío');
        return;
    }

    if (!isBetween(input)) {
        showError(input, 'El campo debe tener entre 3 y 35 caracteres');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
};


// Función para validar el input de email
 export const checkEmailInput = (input) => {
    let valid = false;

    if (isEmpty(input)) {
        showError(input, 'El campo no puede estar vacío');
        return;
    }

    if (!isEmailValid(input)) {
        showError(input, 'El email no es válido');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
};

// Función para validar el textarea de mensaje
const checkTextArea = (textarea) => {
    let valid = false;

    if (isEmpty(textarea)) {
        showError(textarea, 'El campo no puede estar vacío');
        return;
    }

    if (textarea.value.trim().length < 10) {
        showError(textarea, 'El mensaje debe tener al menos 10 caracteres');
        return;
    }

    showSuccess(textarea);
    valid = true;
    return valid;
};

const ValidateForm = (e) => {
    e.preventDefault();

    let isNameValid = checkTextInput(nameForm);
    let isLastnameValid = checkTextInput(lastnameForm);
    let isEmailValid = checkEmailInput(emailForm);
    let isMessageValid = checkTextArea(messageForm);

    let isFormValid = isNameValid && isLastnameValid && isEmailValid && isMessageValid;

    if (isFormValid) {
        form.reset();
        showSuccessSendForm();
    }
}

///////////////////////////////////////////////////////////////////////
////////////////////// INICIALIZAR EL FORMULARIO //////////////////////
///////////////////////////////////////////////////////////////////////

export const initForm = () => {
    nameForm.addEventListener('input', () => checkTextInput(nameForm));
    lastnameForm.addEventListener('input', () => checkTextInput(lastnameForm));
    emailForm.addEventListener('input', () => checkEmailInput(emailForm));
    messageForm.addEventListener('input', () => checkTextArea(messageForm));
    form.addEventListener('submit', ValidateForm);
};
