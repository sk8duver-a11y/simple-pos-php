const parametros = new URLSearchParams(window.location.search);
const idCliente = parametros.get("id");
const txtCliente = document.getElementById("txt-cliente");
const txtCelular = document.getElementById("txt-celular");
const txtCorreo = document.getElementById("txt-correo");
const txtSaldo = document.getElementById("txt-saldo");
const ventasPendientes = document.getElementById("ventas-pendientes");
const tablaVentasPendientes = document.getElementById("tabla-ventas-pendientes");
const modalDetalleVenta = document.getElementById("modal-detalle-venta");
const btnCerrarModalDetalle = document.getElementById("btn-cerrar-modal-2");
const clienteDetalleVenta = document.getElementById("cliente-detalle-venta");
const txtIdVenta = document.getElementById("txt-id-venta");
const txtTotalVenta = document.getElementById("txt-total-venta");

btnCerrarModalDetalle.addEventListener("click", cerrarModalDetalle);

function obtenerCliente() {
  fetch(`controllers/obtener_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())

    .then((cliente) => {
      console.log(cliente);
      txtCliente.textContent = cliente.nombre;
      txtCelular.textContent = cliente.celular;
      txtCorreo.textContent = cliente.correo;
    });
}

function obtenerVentasPendientes() {
  fetch(`controllers/obtener_ventas_pendientes_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())

    .then((ventas) => {
      console.log(ventas);
      console.log(ventas.length)
      mostrarVentasPendientes(ventas);
    });
}

function mostrarVentasPendientes(ventas) {
  ventasPendientes.innerHTML = "";

  let saldoTotal = 0;

  if (ventas.length > 0) {
    tablaVentasPendientes.style.display = "block";
  }

  ventas.forEach((venta) => {
    const fila = document.createElement("tr");

    saldoTotal += Number(venta.saldo);

    fila.innerHTML = `
            <td>${venta.id_venta}</td>
            <td>${venta.fecha}</td>
            <td>${venta.productos}</td>
            <td>$${Number(venta.total).toLocaleString("es-CO")}</td>
            <td></td>
        `;

    const btnDetalle = document.createElement("button");
    btnDetalle.textContent = "Ver detalle";
    btnDetalle.dataset.idVenta = venta.id_venta;
    btnDetalle.classList.add("btn-cancelar");

    btnDetalle.addEventListener("click", function () {
      const idVenta = btnDetalle.dataset.idVenta;
      obtenerDetalleVenta(idVenta);
    })

    fila.lastElementChild.appendChild(btnDetalle);
    ventasPendientes.appendChild(fila);
  });

  txtSaldo.textContent = `$${saldoTotal.toLocaleString("es-CO")}`;
}

function obtenerDetalleVenta (idVenta) {
  fetch(`controllers/obtener_detalle_venta.php?idVenta=${idVenta}`)
  .then((respuesta) => respuesta.json())
  .then((productos) => {
    console.log(productos);
    modalDetalleVenta.showModal();

    txtIdVenta.textContent = "Venta #" + idVenta;
    clienteDetalleVenta.innerHTML = "";
    let totalVenta = 0;

    productos.forEach((producto) => {
      const fila = document.createElement("tr");
      totalVenta += Number(producto.subtotal);

      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${Number(producto.precio_venta).toLocaleString("es-CO")}</td>
        <td>$${Number(producto.subtotal).toLocaleString("es-CO")}</td>
      `;
      clienteDetalleVenta.appendChild(fila);
    });
    txtTotalVenta.textContent = `$${totalVenta.toLocaleString("es-CO")}`;
  });
};

function cerrarModalDetalle () {
  modalDetalleVenta.close();
}

obtenerCliente();
obtenerVentasPendientes();