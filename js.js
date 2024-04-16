document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');

    if (!nameInput.value || !emailInput.value || !phoneInput.value) {
        displayMessage('Por favor, complete todos los campos del formulario.', 'red');
        return; 
    }

    if (!isValidEmail(emailInput.value)) {
        displayMessage('Por favor, ingrese un correo electrónico válido.', 'red');
        return; 
    }

    if (!/^\d{11}$/.test(phoneInput.value)) {
        displayMessage('Por favor, ingrese un número de teléfono válido con exactamente 11 dígitos.', 'red');
        return; 
    }

    if (/[^\d]/.test(phoneInput.value)) {
        displayMessage('El número de teléfono no debe contener letras.', 'red');
        return; 
    }

   
    displayMessage('¡Formulario enviado correctamente!', 'green');
    alert('¡Formulario enviado!');

    var userList = document.getElementById('userList') || document.createElement('ul');
    userList.setAttribute('id', 'userList');

    var userItem = document.createElement('li');
    userItem.textContent = 'Nombre: ' + nameInput.value + ', Correo electrónico: ' + emailInput.value + ', Número de teléfono: ' + phoneInput.value;
    userList.appendChild(userItem);
    document.body.appendChild(userList);

   
    var userEvent = new CustomEvent('userCreated', { detail: { name: nameInput.value, email: emailInput.value, phone: phoneInput.value } });
    document.dispatchEvent(userEvent);
});


function displayMessage(message, color) {
    var messageContainer = document.getElementById('message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.setAttribute('id', 'message');
        document.body.appendChild(messageContainer);
    }
    messageContainer.textContent = message;
    messageContainer.style.color = color;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


document.addEventListener('userCreated', function(e) {
    console.log('Usuario creado: ', e.detail);
});
