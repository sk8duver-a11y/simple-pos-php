const busquedaProducto = document.getElementById("busqueda-producto");
const listaProductos = document.getElementById("lista-productos");
const totalVenta = document.getElementById("total-venta");
const inputPagoCon = document.getElementById("pago-con");
const cambioDinero = document.getElementById("cambio-dinero");
const botonCancelar = document.getElementById("cancelar-venta");
const botonRegistrarVenta = document.getElementById("registrar-venta");
const botonLimpiar = document.getElementById("btn-limpiar-texto");
const tablaVenta = document.getElementById("productos-vender");
const radioVentacontado = document.getElementById("venta-contado");
const radioVentacredito = document.getElementById("venta-credito");
const inputBuscarCliente = document.getElementById("input-buscar-cliente");
const listaClientes = document.getElementById("lista-clientes");
const btnModalVenta = document.getElementById("btn-modal-venta");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");
const btnCerrarModal2 = document.getElementById("btn-cerrar-modal-2");
const modalVenta = document.getElementById("modalVenta");
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");

let idClienteSeleccionado = null;
let totalVendido = 0;
let tiempoBusquedaProducto;
let tiempoBusquedaCliente;

let productosEncontrados = [];
let indiceProductoSeleccionado = -1;



mostrarBuscarCliente();

function formatearMoneda(valor) {
  return `$${Number(valor).toLocaleString("es-CO")}`;
}

function guardarVentaTemporal() {

  const filas = tablaVenta.querySelectorAll("tr");

  const productos = [];

  filas.forEach((fila) => {

    productos.push({
      idProducto: fila.dataset.idProducto,
      codigoBarras: fila.cells[0].textContent,
      nombre: fila.cells[1].textContent,
      precioCompra: fila.dataset.precioCompra,
      precioVenta: fila.dataset.precioVenta,
      cantidad: fila.querySelector(".cantidad").value
    });

  });

  localStorage.setItem("ventaTemporal", JSON.stringify(productos));

}

function cargarVentaTemporal() {

  const ventaGuardada = localStorage.getItem("ventaTemporal");

  // Si no existe una venta guardada, no hacemos nada.
  if (!ventaGuardada) {
    return;
  }

  try {

    const productos = JSON.parse(ventaGuardada);

    // Comprobar que los datos sean un arreglo.
    if (!Array.isArray(productos)) {
      return;
    }

    productos.forEach((productoGuardado) => {

      // Reconstruir el objeto con la estructura que utiliza agregarProductoVenta().
      const producto = {
        id_producto: Number(productoGuardado.idProducto),
        codigo_barras: productoGuardado.codigoBarras,
        nombre: productoGuardado.nombre,
        precio_compra: Number(productoGuardado.precioCompra),
        precio_venta: Number(productoGuardado.precioVenta)
      };

      // Agregar nuevamente el producto a la tabla.
      agregarProductoVenta(producto);

      // Buscar la fila que acabamos de agregar.
      const fila = Array.from(tablaVenta.querySelectorAll("tr"))
        .find((fila) => fila.dataset.idProducto === String(producto.id_producto));

      if (fila) {

        // Recuperar la cantidad que tenía el producto.
        const inputCantidad = fila.querySelector(".cantidad");

        inputCantidad.value = Math.max(1, Number(productoGuardado.cantidad) || 1);

        // Ejecutar el evento input para recalcular el subtotal y el total.
        inputCantidad.dispatchEvent(new Event("input"));

      }

    });

  } catch (error) {

    console.error("Error al recuperar la venta temporal:", error);

    localStorage.removeItem("ventaTemporal");

  }

}

busquedaProducto.addEventListener("input", function () {
  clearTimeout(tiempoBusquedaProducto);

  tiempoBusquedaProducto = setTimeout(() => {
    buscarProductos();
  }, 300);
});

inputPagoCon.addEventListener("input", calcularCambio);
botonCancelar.addEventListener("click", cancelarVenta);
botonRegistrarVenta.addEventListener("click", registrarVenta);
botonLimpiar.addEventListener("click", limpiarProductoBuscado);
radioVentacontado.addEventListener("click", mostrarBuscarCliente);
radioVentacredito.addEventListener("click", mostrarBuscarCliente);

inputBuscarCliente.addEventListener("input", function () {
  clearTimeout(tiempoBusquedaCliente)

  tiempoBusquedaCliente = setTimeout(() => {
    idClienteSeleccionado = null;
    buscarClientes();
  }, 300);
});

btnModalVenta.addEventListener("click", abrirModalVenta);
btnCerrarModal.addEventListener("click", cerrarModalVenta);
btnCerrarModal2.addEventListener("click", cerrarModalVenta);

busquedaProducto.addEventListener("keydown", manejarTecladoProductos);

function manejarTecladoProductos(evento) {

  const items = listaProductos.querySelectorAll(".item-producto");

  // Navegar hacia abajo.
  if (evento.key === "ArrowDown" && items.length > 0) {
    evento.preventDefault();

    indiceProductoSeleccionado++;

    if (indiceProductoSeleccionado >= items.length) {
      indiceProductoSeleccionado = 0;
    }

    actualizarProductoSeleccionado(items);
    return;
  }

  // Navegar hacia arriba.
  if (evento.key === "ArrowUp" && items.length > 0) {
    evento.preventDefault();

    indiceProductoSeleccionado--;

    if (indiceProductoSeleccionado < 0) {
      indiceProductoSeleccionado = items.length - 1;
    }

    actualizarProductoSeleccionado(items);
    return;
  }

  // Agregar el producto seleccionado con Enter.
  if (evento.key === "Enter") {

    if (items.length > 0 && listaProductos.style.display !== "none") {

      evento.preventDefault();

      if (indiceProductoSeleccionado === -1) {
        indiceProductoSeleccionado = 0;
      }

      agregarProductoVenta(productosEncontrados[indiceProductoSeleccionado]);
      return;
    }

    // Si no hay sugerencias, buscar por código de barras.
    buscarCodigoBarras(evento);
  }

  // Cerrar las sugerencias con Escape.
  if (evento.key === "Escape") {
    limpiarProductoBuscado();
  }
}

function actualizarProductoSeleccionado(items) {

  items.forEach((item, indice) => {

    // Comprobar si este elemento es el seleccionado.
    const seleccionado = indice === indiceProductoSeleccionado;

    // Agregar o quitar la clase CSS.
    item.classList.toggle("seleccionado", seleccionado);

    // Mantener visible el producto seleccionado.
    if (seleccionado) {
      item.scrollIntoView({
        block: "nearest"
      });
    }

  });

}

async function buscarProductos() {
  const texto = busquedaProducto.value.trim();

  if (texto === "") {
    listaProductos.style.display = "none";
    listaProductos.innerHTML = "";
    return;
  }

  const respuesta = await fetch(
    "controllers/listar_productos.php?buscar=" + encodeURIComponent(texto),
  );
  const productos = await respuesta.json();

  // Guardar los productos encontrados.
  productosEncontrados = productos;

  // Reiniciar la selección cada vez que cambia la búsqueda.
  indiceProductoSeleccionado = -1;

  listaProductos.innerHTML = "";

  if (productos.length === 0) {
    listaProductos.style.display = "none";
    return;
  }

  productos.forEach((producto) => {
    const div = document.createElement("div");

    div.classList.add("item-producto");

    div.textContent = `${producto.codigo_barras} | ${producto.nombre} | ${formatearMoneda(producto.precio_venta)}`;

    div.addEventListener("click", function () {
      agregarProductoVenta(producto);
    });

    listaProductos.appendChild(div);
  });

  listaProductos.style.display = "block";
}

function agregarProductoVenta(producto) {
  const filas = tablaVenta.querySelectorAll("tr");

  for (const fila of filas) {
    const codigo = fila.cells[0].textContent;

    if (codigo === producto.codigo_barras) {
      const inputCantidad = fila.querySelector("input");

      inputCantidad.value = Number(inputCantidad.value) + 1;

      const totalFila = producto.precio_venta * Number(inputCantidad.value);
      fila.dataset.totalFila = totalFila;
      fila.cells[4].textContent = formatearMoneda(totalFila);

      calcularTotalVenta();

      guardarVentaTemporal();

      limpiarBusqueda();

      return;
    }
  }

  const fila = document.createElement("tr");

  fila.dataset.idProducto = producto.id_producto;
  fila.dataset.precioCompra = producto.precio_compra;
  fila.dataset.precioVenta = producto.precio_venta;
  fila.dataset.totalFila = producto.precio_venta;

  fila.innerHTML = `
        <td>${producto.codigo_barras}</td>
        <td>${producto.nombre}</td>
        <td>${formatearMoneda(producto.precio_venta)}</td>
        <td><input type="number" class="cantidad" value="1" min="1" style="width:60px;"></td>
        <td class="total-fila">${formatearMoneda(producto.precio_venta)}</td>
        <td><button class="btn-eliminar"><span class="material-symbols-outlined" style="color: var(--red-btn);">delete</span></button></td>
    `;

  tablaVenta.appendChild(fila);

  calcularTotalVenta();

  const inputCantidad = fila.querySelector(".cantidad");
  const botonEliminar = fila.querySelector(".btn-eliminar");

  inputCantidad.addEventListener("input", function () {
    if (this.value < 1) {
      this.value = 1;
    }

    const total = producto.precio_venta * Number(this.value);

    fila.dataset.totalFila = total;
    fila.querySelector(".total-fila").textContent = formatearMoneda(total);

    calcularTotalVenta();

    guardarVentaTemporal();
  });

  botonEliminar.addEventListener("click", function () {
    fila.remove();
    calcularTotalVenta();
    guardarVentaTemporal();
  });

  // Guardar la venta temporal después de agregar un producto nuevo.
  guardarVentaTemporal();
  
  limpiarBusqueda();
}

async function buscarCodigoBarras(evento) {
  if (evento.key !== "Enter") {
    return;
  }

  evento.preventDefault();

  const codigo = busquedaProducto.value.trim();

  if (codigo === "") {
    return;
  }

  const respuesta = await fetch(
    "controllers/listar_productos.php?buscar=" + codigo,
  );
  const productos = await respuesta.json();
  const producto = productos.find((p) => p.codigo_barras === codigo);

  if (!producto) {
    mensajeAlerta.textContent = "Producto no encontrado.";
    modalAlerta.showModal();
    return;
  }

  agregarProductoVenta(producto);
}

function calcularTotalVenta() {
  let total = 0;
  const filas = tablaVenta.querySelectorAll("tr");

  for (const fila of filas) {
    total += Number(fila.dataset.totalFila || 0);
  }

  totalVenta.textContent = formatearMoneda(total);
  totalVendido = total;

  calcularCambio();
}

function calcularCambio() {
  const pago = Number(inputPagoCon.value);

  if (pago < totalVendido) {
    cambioDinero.textContent = formatearMoneda(0);
  } else {
    cambioDinero.textContent = formatearMoneda(pago - totalVendido);
  }
}

function cancelarVenta() {
  tablaVenta.innerHTML = "";
  totalVenta.textContent = formatearMoneda(0);
  inputPagoCon.value = "";
  cambioDinero.textContent = formatearMoneda(0);
  busquedaProducto.value = "";
  busquedaProducto.focus();
  listaProductos.innerHTML = "";
  listaProductos.style.display = "none";

  // Eliminar la venta temporal del navegador.
  localStorage.removeItem("ventaTemporal");

  // Reiniciar las variables de la búsqueda.
  productosEncontrados = [];
  indiceProductoSeleccionado = -1;
}

async function registrarVenta() {
  const filas = tablaVenta.querySelectorAll("tr");
  const productos = [];

  if (radioVentacredito.checked && !idClienteSeleccionado) {
    mensajeAlerta.textContent = "No se puede registrar la venta porque el cliente no existe en la base de datos.";
    modalAlerta.showModal();
    return;
  }

  for (const fila of filas) {
    productos.push({
      idProducto: Number(fila.dataset.idProducto),
      codigoBarras: fila.cells[0].textContent,
      nombre: fila.cells[1].textContent,
      precioCompra: Number(fila.dataset.precioCompra),
      precioVenta: Number(fila.dataset.precioVenta),
      cantidad: Number(fila.querySelector(".cantidad").value),
      subtotal: Number(fila.dataset.totalFila || 0),
    });
  }

  const venta = {
    total: totalVendido,
    pagoCon: Number(inputPagoCon.value),
    cambio: Number(cambioDinero.textContent),
    productos: productos,
    tipoVenta: radioVentacontado.checked ? "CONTADO" : "CREDITO",
    idCliente: idClienteSeleccionado,
    estado: radioVentacontado.checked ? "PAGADA" : "PENDIENTE",
  };

  const respuesta = await fetch("controllers/registrar_venta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venta),
  });

  const resultado = await respuesta.json();

  mensajeAlerta.textContent = resultado.mensaje;
  modalAlerta.showModal();

  cerrarModalVenta();
  cancelarVenta();
}

function limpiarProductoBuscado() {
  busquedaProducto.value = "";
  busquedaProducto.focus();

  listaProductos.innerHTML = "";
  listaProductos.style.display = "none";

  productosEncontrados = [];
  indiceProductoSeleccionado = -1;
}

function limpiarBusqueda() {
  listaProductos.innerHTML = "";
  listaProductos.style.display = "none";

  productosEncontrados = [];
  indiceProductoSeleccionado = -1;

  busquedaProducto.value = "";
  busquedaProducto.focus();
}

function mostrarBuscarCliente() {
  if (radioVentacontado.checked) {
    inputBuscarCliente.disabled = true;
    inputBuscarCliente.value = "";
    inputBuscarCliente.placeholder = "";
    listaClientes.style.display = "none";
    idClienteSeleccionado = null;
  } else {
    inputBuscarCliente.disabled = false;
    inputBuscarCliente.value = "";
    inputBuscarCliente.focus();
    inputBuscarCliente.placeholder = "Buscar cliente...";
  }
}

async function buscarClientes() {
  const textoCliente = inputBuscarCliente.value.trim();

  if (textoCliente === "") {
    listaClientes.style.display = "none";
    listaClientes.innerHTML = "";
    return;
  }

  const respuestaClientes = await fetch("controllers/listar_clientes.php?buscar=" + textoCliente,);

  const clientes = await respuestaClientes.json();

  listaClientes.innerHTML = "";

  if (clientes.length === 0) {
    listaClientes.style.display = "none";
    return;
  }

  clientes.forEach((cliente) => {
    const div = document.createElement("div");

    div.classList.add("item-cliente");

    div.textContent = `${cliente.nombre}`;

    div.addEventListener("click", function () {
      seleccionarCliente(cliente)
    });

    listaClientes.appendChild(div);
  })

  listaClientes.style.display = "block";
}

function seleccionarCliente(cliente) {
  inputBuscarCliente.value = cliente.nombre;
  listaClientes.style.display = "none";
  idClienteSeleccionado = cliente.id_cliente;
}

function abrirModalVenta() {
  const filas = tablaVenta.querySelectorAll("tr");

  if (filas.length === 0) {
    mensajeAlerta.textContent = "Debe agregar al menos un producto.";
    modalAlerta.showModal();
    return;
  } else {
    modalVenta.showModal();
    radioVentacontado.checked = true;
    inputBuscarCliente.disabled = true;
    inputBuscarCliente.value = "";
    inputBuscarCliente.placeholder = "";
    listaClientes.style.display = "none";
    idClienteSeleccionado = null;
  }
}

function cerrarModalVenta() {
  modalVenta.close();
}

// Recuperar la venta temporal al cargar la página.
cargarVentaTemporal();