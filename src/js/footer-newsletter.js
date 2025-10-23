import { checkEmailInput } from './form.js';

/// Elementos del formulario de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
const emailNewsletterInput = document.querySelector('.newsletter-email');
const successMessageNewsletter = document.querySelector('.success-newsletter');


/// Función para mostrar el mensaje de éxito al enviar el formulario
const showSuccessNewsletterForm = () => {
    successMessageNewsletter.style.display = 'block';
    setTimeout(() => {
        successMessageNewsletter.style.display = 'none';
    }, 3000);
};

/// Función para validar y manejar el envío del formulario de newsletter
const validateNewsletterForm = (e) => {
    e.preventDefault();

    if (checkEmailInput(emailNewsletterInput)) {
        
        newsletterForm.reset();
        showSuccessNewsletterForm();
    }
}


// Inicializa los eventos del formulario de newsletter
export const initNewsletterForm = () => {
    emailNewsletterInput.addEventListener('input', () => checkEmailInput(emailNewsletterInput));
    newsletterForm.addEventListener('submit', validateNewsletterForm);
}