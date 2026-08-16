const loginPuntoVenta = document.getElementById("login-puntoVenta");

loginPuntoVenta.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  const datos = {
    usuario,
    password,
  };

  if (datos.usuario.trim() === "" || datos.password.trim() === "") {
    alert("Debe completar todos los campos.");
    return;
  }

  fetch("controllers/obtener_login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((respuesta) => respuesta.text())
    .then((resultado) => {
      if (resultado === "Login correcto") {
        window.location.href = "index.php";
      } else {
        alert(resultado);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
