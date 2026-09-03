const parametros = new URLSearchParams(window.location.search);
const idCliente = parametros.get("id");
const txtCliente = document.getElementById("txt-cliente");
const txtCelular = document.getElementById("txt-celular");
const txtCorreo = document.getElementById("txt-correo");
const txtSaldo = document.getElementById("txt-saldo");
const ventasPendientes = document.getElementById("ventas-pendientes");
const tablaVentasPendientes = document.getElementById(
  "tabla-ventas-pendientes",
);
const historialVentas = document.getElementById("historial-ventas");
const tablaHistorialVentasPendientes = document.getElementById(
  "tabla-historial-ventas-pendientes",
);
const historialPagos = document.getElementById("historial-pagos");
const tablaHistorialPagos = document.getElementById("tabla-historial-pagos");
const modalDetalleVenta = document.getElementById("modal-detalle-venta");
const btnCerrarModalDetalle = document.getElementById("btn-cerrar-modal-2");
const clienteDetalleVenta = document.getElementById("cliente-detalle-venta");
const txtIdVenta = document.getElementById("txt-id-venta");
const txtTotalVenta = document.getElementById("txt-total-venta");
const btnHistorialVentas = document.getElementById("btn-historial-ventas");
const btnVentasPendientes = document.getElementById("btn-ventas-pendientes");
const btnHistorialPagos = document.getElementById("btn-historial-pagos");
const btnAbonar = document.getElementById("btn-abonar");
const modalAbono = document.getElementById("modal-abono");
const inputAbono = document.getElementById("input-abono");
const saldoAbono = document.getElementById("saldo-abono");
const btnCerrarAbono = document.getElementById("btn-cerrar-abono");
const btnCancelarAbono = document.getElementById("btn-cancelar-abono");
const btnConfirmarAbono = document.getElementById("btn-confirmar-abono");
const btnLiquidar = document.getElementById("btn-liquidar");
const modalLiquidar = document.getElementById("modal-liquidar");
const btnCancelarLiquidar = document.getElementById("btn-cancelar-liquidar");
const btnConfirmarLiquidar = document.getElementById("btn-confirmar-liquidar");
const btnCerrarLiquidar = document.getElementById("btn-cerrar-liquidar");
const saldoLiquidar = document.getElementById("saldo-liquidar");

let saldoTotal = 0;

btnCerrarModalDetalle.addEventListener("click", cerrarModalDetalle);

function formatearFecha(fecha) {
  const [fechaParte, horaParte] = fecha.split(" ");
  const [anio, mes, dia] = fechaParte.split("-");
  return `${dia}/${mes}/${anio} - ${horaParte}`;
}

function obtenerCliente() {
  fetch(`controllers/obtener_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())
    .then((cliente) => {
      txtCliente.textContent = cliente.nombre;
      txtCelular.textContent = cliente.celular;
      txtCorreo.textContent = cliente.correo;
    });
}

function obtenerVentasPendientes() {
  fetch(`controllers/obtener_ventas_pendientes_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())
    .then((ventas) => {
      mostrarVentasPendientes(ventas);
    });
}

function mostrarVentasPendientes(ventas) {
  ventasPendientes.innerHTML = "";
  saldoTotal = 0;

  if (ventas.length > 0) {
    tablaVentasPendientes.style.display = "flex";
  }

  ventas.forEach((venta) => {
    const fila = document.createElement("tr");

    saldoTotal += Number(venta.saldo);

    fila.innerHTML = `
            <td>${venta.id_venta}</td>
            <td>${formatearFecha(venta.fecha)}</td>
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
    });

    fila.lastElementChild.appendChild(btnDetalle);
    ventasPendientes.appendChild(fila);
  });

  txtSaldo.textContent = `$${saldoTotal.toLocaleString("es-CO")}`;
}

function obtenerHistorialVentas() {
  fetch(`controllers/obtener_historial_ventas_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())
    .then((ventas) => {
      mostrarHistorialVentas(ventas);
    });
}

function mostrarHistorialVentas(ventas) {
  historialVentas.innerHTML = "";

  ventas.forEach((venta) => {
    let claseEstado = "";

    if (venta.estado === "PENDIENTE") {
      claseEstado = "estado-pendiente";
    } else if (venta.estado === "PAGADA") {
      claseEstado = "estado-pagada";
    }

    const fila = document.createElement("tr");

    fila.innerHTML = `
            <td>${venta.id_venta}</td>
            <td>${formatearFecha(venta.fecha)}</td>
            <td>${venta.productos}</td>
            <td>$${Number(venta.total).toLocaleString("es-CO")}</td>
            <td>
                <span class="estado ${claseEstado}">${venta.estado}</span>
            </td>
            <td></td>
        `;

    const btnDetalle = document.createElement("button");
    btnDetalle.textContent = "Ver detalle";
    btnDetalle.dataset.idVenta = venta.id_venta;
    btnDetalle.classList.add("btn-cancelar");

    btnDetalle.addEventListener("click", function () {
      const idVenta = btnDetalle.dataset.idVenta;
      obtenerDetalleVenta(idVenta);
    });

    fila.lastElementChild.appendChild(btnDetalle);
    historialVentas.appendChild(fila);
  });
}

function obtenerDetalleVenta(idVenta) {
  fetch(`controllers/obtener_detalle_venta.php?idVenta=${idVenta}`)
    .then((respuesta) => respuesta.json())
    .then((productos) => {
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
}

function obtenerHistorialPagos() {
  fetch(`controllers/obtener_historial_pagos_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())
    .then((pagos) => {
      mostrarHistorialPagos(pagos);
    });
}

function mostrarHistorialPagos(pagos) {
  historialPagos.innerHTML = "";

  pagos.forEach((pago) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
            <td>${formatearFecha(pago.fecha)}</td>
            <td>${pago.id_venta}</td>
            <td>$${Number(pago.monto).toLocaleString("es-CO")}</td>
        `;

    historialPagos.appendChild(fila);
  });
}

btnHistorialVentas.addEventListener("click", function () {
  tablaVentasPendientes.style.display = "none";
  tablaHistorialPagos.style.display = "none";
  tablaHistorialVentasPendientes.style.display = "flex";
});

btnVentasPendientes.addEventListener("click", function () {
  tablaHistorialVentasPendientes.style.display = "none";
  tablaHistorialPagos.style.display = "none";
  tablaVentasPendientes.style.display = "flex";
});

btnHistorialPagos.addEventListener("click", function () {
  tablaHistorialVentasPendientes.style.display = "none";
  tablaVentasPendientes.style.display = "none";
  tablaHistorialPagos.style.display = "flex";
});

function cerrarModalDetalle() {
  modalDetalleVenta.close();
}

btnAbonar.addEventListener("click", function () {
  saldoAbono.textContent = `$${saldoTotal.toLocaleString("es-CO")}`;

  if (saldoTotal <= 0) {
    alert("No hay saldo pendiente para abonar.");
    return;
  }

  inputAbono.value = "";
  modalAbono.showModal();
  inputAbono.focus();
});

btnCerrarAbono.addEventListener("click", function () {
  modalAbono.close();
});

btnCancelarAbono.addEventListener("click", function () {
  modalAbono.close();
});

btnConfirmarAbono.addEventListener("click", function () {
  const monto = Number(inputAbono.value);

  if (monto <= 0) {
    alert("Ingrese un monto válido.");
    inputAbono.focus();
    return;
  }

  if (monto > saldoTotal) {
    alert("El abono no puede ser mayor al saldo pendiente.");
    inputAbono.focus();
    return;
  }

  const datos = new FormData();

  datos.append("idCliente", idCliente);
  datos.append("monto", monto);

  fetch("controllers/registrar_abono.php", {
    method: "POST",
    body: datos,
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      if (resultado.success) {
        alert(resultado.mensaje);
        modalAbono.close();
        obtenerVentasPendientes();
        obtenerHistorialVentas();
        obtenerHistorialPagos();
      } else {
        alert(resultado.mensaje);
      }
    });
});

btnLiquidar.addEventListener("click", function () {
  saldoLiquidar.textContent = `$${saldoTotal.toLocaleString("es-CO")}`;

  if (saldoTotal <= 0) {
    alert("No hay saldo pendiente para liquidar.");
    return;
  }

  modalLiquidar.showModal();
});

btnCerrarLiquidar.addEventListener("click", function () {
  modalLiquidar.close();
});

btnCancelarLiquidar.addEventListener("click", function () {
  modalLiquidar.close();
});

btnConfirmarLiquidar.addEventListener("click", function () {
  const monto = saldoTotal;

  const datos = new FormData();

  datos.append("idCliente", idCliente);
  datos.append("monto", monto);

  fetch("controllers/registrar_abono.php", {
    method: "POST",
    body: datos,
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      if (resultado.success) {
        modalLiquidar.close();
        obtenerVentasPendientes();
        obtenerHistorialVentas();
        obtenerHistorialPagos();
      } else {
        alert(resultado.mensaje);
      }
    });
});

obtenerCliente();
obtenerVentasPendientes();
obtenerHistorialVentas();
obtenerHistorialPagos();
