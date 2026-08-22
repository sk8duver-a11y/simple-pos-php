const formularioClientes = document.getElementById('agregar-cliente');

formularioClientes.addEventListener('submit', function (event) {
    event.preventDefault();

    const datos = {
        nombreCliente: document.getElementById('nombre-cliente').value,
        celularCliente: document.getElementById('celular-cliente').value,
        correoCliente: document.getElementById('correo-cliente').value
    };




})