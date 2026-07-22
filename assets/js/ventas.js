const inputGanancia = document.getElementById("input-ganancia");
const btnGanancia = document.getElementById("btn-ganancia");

const verGanancia = document.getElementById("ver-ganancia");
const verTotalVendido = document.getElementById("ver-total-vendido");
const verCantidadVentas = document.getElementById("ver-cantidad-ventas");

const sectionVentasDia = document.getElementById("section-ventas-dia");

btnGanancia.addEventListener("click", obtenerVentasDia);

obtenerVentasDia();

function obtenerVentasDia() {
  const fecha = inputGanancia.value;

  fetch(`php/obtener_ventas_dia.php?fecha=${fecha}`)
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
      const siguienteFila = tr.nextElementSibling;
      if (siguienteFila && siguienteFila.classList.contains("detalle-venta")) {
        siguienteFila.remove();
        btnDetalle.textContent = "Ver detalle";
      } else {
        verDetalleVenta(btnDetalle.dataset.idVenta, tr);
        btnDetalle.textContent = "Cerrar detalle";
      }
    });

    tdAcciones.appendChild(btnDetalle);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);
  sectionVentasDia.appendChild(tabla);
}

function verDetalleVenta(idVenta, tr) {
  fetch(`php/obtener_detalle_venta.php?idVenta=${idVenta}`)
    .then((respuesta) => respuesta.json())
    .then((detalle) => {
      mostrarDetalleVenta(detalle, tr, idVenta);
    });
}

function mostrarDetalleVenta(detalle, tr, idVenta) {
  // Crear la fila donde irá el detalle
  const trDetalle = document.createElement("tr");
  trDetalle.classList.add("detalle-venta");
  // Crear la celda que ocupará todas las columnas
  const tdDetalle = document.createElement("td");
  tdDetalle.colSpan = 4;
  // Crear la tabla del detalle
  const tabla = crearTablaDetalle(detalle);
  // Agregar la tabla dentro de la celda
  tdDetalle.appendChild(tabla);

  const btnEliminarVenta = document.createElement("button");
  btnEliminarVenta.textContent = "Eliminar venta";
  btnEliminarVenta.classList.add("btn-eliminar");

  btnEliminarVenta.addEventListener("click", function () {
    eliminarVenta(idVenta)
  });


  const contenedorBoton = document.createElement("div");
  contenedorBoton.classList.add("contenedor-eliminar-venta");

  contenedorBoton.appendChild(btnEliminarVenta);

  tdDetalle.appendChild(contenedorBoton);


  // Agregar la celda a la fila
  trDetalle.appendChild(tdDetalle);
  // Insertar la fila debajo de la venta seleccionada
  tr.after(trDetalle);
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
      eliminarProductoVenta(producto.id_detalle, btnEliminar.dataset.nombre);
    });

    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);
  return tabla;
}

function eliminarProductoVenta(idDetalle, nombre) {
  if (
    !confirm(
      `¿Está seguro de que desea eliminar el producto ${nombre} del historial de ventas?`,
    )
  ) {
    return;
  }

  fetch("php/eliminar_producto_venta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idDetalle: idDetalle }),
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      if (resultado.success) {
        obtenerVentasDia();
      } else {
        alert(resultado.mensaje);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Ocurrió un error al eliminar el producto.");
    });
}

function eliminarVenta(idVenta) {

  if (
    !confirm("¿Está seguro de que desea eliminar esta venta del historial?")
  ) {
    return;
  }

  fetch("php/eliminar_venta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idVenta: idVenta })
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      if (resultado.success) {
        obtenerVentasDia()
      } else {
        alert(resultado.mensaje);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Ocurrió un error al eliminar la.");
    });
};
