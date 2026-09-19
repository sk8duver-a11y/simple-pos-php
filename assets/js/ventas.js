const inputGanancia = document.getElementById("input-ganancia");
const btnGanancia = document.getElementById("btn-ganancia");
const verGanancia = document.getElementById("ver-ganancia");
const verTotalVendido = document.getElementById("ver-total-vendido");
const verCantidadVentas = document.getElementById("ver-cantidad-ventas");
const sectionVentasDia = document.getElementById("section-ventas-dia");
const modalDetalleVenta = document.getElementById("modal-detalle-venta");
const contenidoDetalleVenta = document.getElementById("contenido-detalle-venta");
const btnCerrarModal = document.getElementById("btn-cerrar-modal-2");
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");
const modalEliminarProducto = document.getElementById("modal-eliminar-producto");
const btnEliminarProducto = document.getElementById("btn-eliminar-producto");
const modalEliminarVenta = document.getElementById("modal-eliminar-venta");
const btnConfirmarEliminarVenta = document.getElementById("btn-confirmar-eliminar-venta");
const nombreProductoEliminar = document.getElementById("nombre-producto-eliminar");

let idDetalle = null;
let idVenta = null;

btnGanancia.addEventListener("click", obtenerVentasDia);

btnCerrarModal.addEventListener("click", function () {
  modalDetalleVenta.close();
});

obtenerVentasDia();

function obtenerVentasDia() {
  const fecha = inputGanancia.value;

  fetch(`controllers/obtener_ventas_dia.php?fecha=${fecha}`)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      mostrarResumen(datos);
      crearTablaVentas(datos.ventas);
    });
}

function mostrarResumen(datos) {
  verGanancia.textContent = `$${Number(datos.ganancia).toLocaleString("es-CO")}`;
  verTotalVendido.textContent = `$${Number(datos.total_vendido).toLocaleString("es-CO")}`;
  verCantidadVentas.textContent = datos.cantidad_ventas;
}

function crearTablaVentas(ventas) {
  sectionVentasDia.textContent = "";

  const tabla = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const encabezados = ["Hora", "Productos", "Total", "Acciones"];

  encabezados.forEach((texto) => {
    const th = document.createElement("th");
    th.textContent = texto;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  ventas.forEach((venta) => {
    const tr = document.createElement("tr");

    const tdHora = document.createElement("td");
    tdHora.textContent = venta.hora;
    tr.appendChild(tdHora);

    const tdProductos = document.createElement("td");
    tdProductos.textContent = venta.productos;
    tr.appendChild(tdProductos);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = `$${Number(venta.total).toLocaleString("es-CO")}`;
    tr.appendChild(tdTotal);

    const tdAcciones = document.createElement("td");
    const btnDetalle = document.createElement("button");
    btnDetalle.textContent = "Ver detalle";
    btnDetalle.classList.add("btn-cancelar");
    btnDetalle.dataset.idVenta = venta.id_venta;

    btnDetalle.addEventListener("click", function () {
      verDetalleVenta(btnDetalle.dataset.idVenta);
      idVenta = btnDetalle.dataset.idVenta;
    });

    tdAcciones.appendChild(btnDetalle);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);
  sectionVentasDia.appendChild(tabla);
}

function verDetalleVenta(idVenta) {
  fetch(`controllers/obtener_detalle_venta.php?idVenta=${idVenta}`)
    .then((respuesta) => respuesta.json())
    .then((detalle) => {
      mostrarDetalleVenta(detalle);
    });
}

function mostrarDetalleVenta(detalle) {
  contenidoDetalleVenta.textContent = ""; 

  const tabla = crearTablaDetalle(detalle);
  
  contenidoDetalleVenta.appendChild(tabla);

  const btnEliminarVenta = document.createElement("button");

  btnEliminarVenta.textContent = "Eliminar venta";

  btnEliminarVenta.classList.add("btn-eliminar");

  btnEliminarVenta.addEventListener("click", function () { 
    modalEliminarVenta.showModal();
  });

  const contenedorBoton = document.createElement("div");
  contenedorBoton.classList.add("contenedor-eliminar-venta");

  contenedorBoton.appendChild(btnEliminarVenta);

  contenidoDetalleVenta.appendChild(contenedorBoton); 
  
  modalDetalleVenta.showModal();
}

function crearTablaDetalle(detalle) {
  const tabla = document.createElement("table");
  tabla.classList.add("tabla-detalle");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const encabezados = [
    "Producto",
    "Cantidad",
    "Precio",
    "Subtotal",
    "Acciones",
  ];

  encabezados.forEach((texto) => {
    const th = document.createElement("th");
    th.textContent = texto;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  detalle.forEach((producto) => {
    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;
    tr.appendChild(tdNombre);

    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = producto.cantidad;
    tr.appendChild(tdCantidad);

    const tdPrecioVenta = document.createElement("td");
    tdPrecioVenta.textContent = `$${Number(producto.precio_venta).toLocaleString("es-CO")}`;
    tr.appendChild(tdPrecioVenta);

    const tdSubtotal = document.createElement("td");
    tdSubtotal.textContent = `$${Number(producto.subtotal).toLocaleString("es-CO")}`;
    tr.appendChild(tdSubtotal);

    const tdAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.dataset.idDetalle = producto.id_detalle;
    btnEliminar.dataset.nombre = producto.nombre;

    btnEliminar.addEventListener("click", function () {
      modalEliminarProducto.showModal();
      nombreProductoEliminar.textContent = btnEliminar.dataset.nombre;
      idDetalle = btnEliminar.dataset.idDetalle;
    });

    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);
  return tabla;
}

btnEliminarProducto.addEventListener("click", function () {

  fetch("controllers/eliminar_producto_venta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idDetalle: idDetalle }),
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      if (resultado.success) {
        modalDetalleVenta.close();
        modalEliminarProducto.close();
        mensajeAlerta.textContent = resultado.mensaje;
        modalAlerta.showModal();
        obtenerVentasDia();
      } else {
        alert(resultado.mensaje);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Ocurrió un error al eliminar el producto.");
    });
});

btnConfirmarEliminarVenta.addEventListener("click", function () {

  fetch("controllers/eliminar_venta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idVenta: idVenta })
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      if (resultado.success) {
        modalDetalleVenta.close();
        modalEliminarVenta.close();
        mensajeAlerta.textContent = resultado.mensaje;
        modalAlerta.showModal();
        obtenerVentasDia()
      } else {
        alert(resultado.mensaje);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Ocurrió un error al eliminar la venta.");
    });
});
