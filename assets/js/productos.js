const formularioProductos = document.getElementById("agregar-producto");
const tablaProductos = document.getElementById("productos-registrados");
const botonGuardar = document.getElementById("btn-agregar-producto");
const botonCancelar = document.getElementById("cancelar");
const buscarProducto = document.getElementById("buscar-producto");
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");
const modalEliminarProducto = document.getElementById(
  "modal-eliminar-producto",
);
const btnEliminarProducto = document.getElementById("btn-eliminar-producto");
const nombreProductoEliminar = document.getElementById(
  "nombre-producto-eliminar",
);

let idEditar = null;
let idProducto = null;
let listaProductos = [];
listarProductos();

formularioProductos.addEventListener("submit", function (event) {
  event.preventDefault();

  const datos = {
    idProducto: idEditar,
    codigoBarras: document.getElementById("codigo-barras").value,
    nombre: document.getElementById("nombre").value,
    precioCompra: document.getElementById("precio-compra").value,
    precioVenta: document.getElementById("precio-venta").value,
  };

  let archivo = "controllers/agregar_producto.php";

  if (idEditar !== null) {
    archivo = "controllers/editar_producto.php";
  }

  if (
    datos.codigoBarras.trim() === "" ||
    datos.nombre.trim() === "" ||
    datos.precioCompra.trim() === "" ||
    datos.precioVenta.trim() === ""
  ) {
    mensajeAlerta.textContent = "Por favor, complete todos los campos";
    modalAlerta.showModal();
    return;
  }

  fetch(archivo, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      modalAlerta.showModal();
      mensajeAlerta.textContent = resultado.mensaje;

      if (
        resultado.mensaje === "Producto agregado correctamente." ||
        resultado.mensaje === "Producto reactivado correctamente." ||
        resultado.mensaje === "Producto actualizado correctamente."
      ) {
        formularioProductos.reset();
        idEditar = null;
        botonGuardar.textContent = "Agregar";
        buscarProducto.value = "";
        listarProductos();
      }
    });
});

function listarProductos(busqueda = "") {
  fetch(
    "controllers/listar_productos.php?buscar=" + encodeURIComponent(busqueda),
  )
    .then((respuesta) => respuesta.json())

    .then((productos) => {
      listaProductos = productos;

      const cantidadProductos = document.getElementById("cantidad-productos");
      cantidadProductos.textContent = productos.length;

      tablaProductos.innerHTML = "";

      productos.forEach((producto) => {
        const fila = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = producto.id_producto;
        fila.appendChild(tdId);

        const tdCodigoBarras = document.createElement("td");
        tdCodigoBarras.textContent = producto.codigo_barras;
        fila.appendChild(tdCodigoBarras);

        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;
        fila.appendChild(tdNombre);

        const tdPrecioCompra = document.createElement("td");
        tdPrecioCompra.textContent = `$${Number(producto.precio_compra).toLocaleString("es-CO")}`;
        fila.appendChild(tdPrecioCompra);

        const tdPrecioVenta = document.createElement("td");
        tdPrecioVenta.textContent = `$${Number(producto.precio_venta).toLocaleString("es-CO")}`;
        fila.appendChild(tdPrecioVenta);

        const tdGanancia = document.createElement("td");
        tdGanancia.textContent = `$${Number(producto.precio_venta - producto.precio_compra).toLocaleString("es-CO")}`;
        fila.appendChild(tdGanancia);

        const tdAcciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.dataset.id_producto = producto.id_producto;
        btnEditar.classList.add("btn-editar");

        btnEditar.addEventListener("click", function () {
          botonGuardar.textContent = "Actualizar";
          idEditar = producto.id_producto;

          const productoEditar = listaProductos.find(
            (u) => u.id_producto == idEditar,
          );

          document.getElementById("codigo-barras").value =
            producto.codigo_barras;
          document.getElementById("nombre").value = producto.nombre;
          document.getElementById("precio-compra").value =
            producto.precio_compra;
          document.getElementById("precio-venta").value = producto.precio_venta;
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.dataset.id_producto = producto.id_producto;
        btnEliminar.classList.add("btn-eliminar");

        btnEliminar.addEventListener("click", function () {
          idProducto = btnEliminar.dataset.id_producto;
          modalEliminarProducto.showModal();
          nombreProductoEliminar.textContent = producto.nombre;
        });

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);
        fila.appendChild(tdAcciones);

        tablaProductos.appendChild(fila);
      });
    });
}

btnEliminarProducto.addEventListener("click", function () {
  fetch("controllers/eliminar_producto.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ idProducto: idProducto }),
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      modalEliminarProducto.close();
      modalAlerta.showModal();
      mensajeAlerta.textContent = resultado.mensaje;
      listarProductos();
      limpiarFormulario();
    });
});

botonCancelar.addEventListener("click", function () {
  limpiarFormulario();
});

function limpiarFormulario() {
  formularioProductos.reset();
  idEditar = null;
  botonGuardar.textContent = "Agregar";
  buscarProducto.value = "";
  buscarProducto.focus();
  idProducto = null;
  listarProductos();
}

buscarProducto.addEventListener("input", function () {
  listarProductos(buscarProducto.value);
});
