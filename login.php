<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Login</title>
    <!-- <link rel="stylesheet" href="assets/css/styles.css"> -->
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/login.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&icon_names=lock,person" />
</head>

<body>
    <form id="login-puntoVenta">
        <div>
            <h2>Iniciar sesión</h2>
            <p>Ingresa tus datos para continuar</p>
        </div>
        <div id="campos-login">
            <div id="campo">
                <label for="usuario">Usuario</label>
                <div class="icono-usuario">
                    <span class="material-symbols-outlined" style="font-size: 16px;">person</span>
                    <input type="text" id="usuario" placeholder="Usuario" required>
                </div>
            </div>
            <div id="campo">
                <label for="password">Contraseña</label>
                <div class="icono-usuario">
                    <span class="material-symbols-outlined" style="font-size: 15px;">lock</span>
                    <input type="password" id="password" placeholder="Contraseña" autocomplete="off" required>
                </div>
            </div>
        </div>
        <div>
            <button type="submit" class="btn-agregar">Ingresar</button>
        </div>
    </form>

    <dialog id="modal-alerta">
        <div id="modal-alerta-contenido">
            <svg width="115px" height="115px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4f46e5" stroke-width="2"></path>
                    <path d="M12 8L12 13" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M12 16V15.9888" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
            <label id="mensaje-alerta"></label>
            <button type="button" class="btn-aceptar-alerta" onclick="modalAlerta.close()">Aceptar</button>
        </div>
    </dialog>

    <script src="assets/js/scriptLogin.js"></script>

</body>

</html>