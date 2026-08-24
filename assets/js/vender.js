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
let totalVendido = 0;

mostrarBuscarCliente();

function formatearMoneda(valor) {
  return `$${Number(valor).toLocaleString("es-CO")}`;
}

busquedaProducto.addEventListener("input", buscarProductos);
busquedaProducto.addEventListener("keydown", buscarCodigoBarras);
inputPagoCon.addEventListener("input", calcularCambio);
botonCancelar.addEventListener("click", cancelarVenta);
botonRegistrarVenta.addEventListener("click", registrarVenta);
botonLimpiar.addEventListener("click", limpiarProductoBuscado);
radioVentacontado.addEventListener("click", mostrarBuscarCliente);
radioVentacredito.addEventListener("click", mostrarBuscarCliente);

busquedaProducto.addEventListener("keydown", (evento) => {
  if (event.key === "Escape") {
    limpiarProductoBuscado();
  }
});

async function buscarProductos() {
  const texto = busquedaProducto.value.trim();

  if (texto === "") {
    listaProductos.style.display = "none";
    listaProductos.innerHTML = "";
    return;
  }

  const respuesta = await fetch(
    "controllers/listar_productos.php?buscar=" + texto,
  );
  const productos = await respuesta.json();

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
        <td><button class="btn-eliminar">X</button></td>
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
  });

  botonEliminar.addEventListener("click", function () {
    fila.remove();
    calcularTotalVenta();
  });

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
    alert("Producto no encontrado.");
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
}

async function registrarVenta() {
  const filas = tablaVenta.querySelectorAll("tr");
  const productos = [];

  if (filas.length === 0) {
    alert("Debe agregar al menos un producto.");
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
  };

  const respuesta = await fetch("controllers/registrar_venta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venta),
  });

  const resultado = await respuesta.json();

  alert(resultado.mensaje);

  cancelarVenta();
}

function limpiarProductoBuscado() {
  busquedaProducto.value = "";
  busquedaProducto.focus();
  listaProductos.style.display = "none";
}

function limpiarBusqueda() {
  listaProductos.innerHTML = "";
  listaProductos.style.display = "none";
  busquedaProducto.value = "";
  busquedaProducto.focus();
}

function mostrarBuscarCliente() {
  if (radioVentacontado.checked) {
    inputBuscarCliente.disabled = true;
    inputBuscarCliente.value = "";
    inputBuscarCliente.focus();
  } else {
    inputBuscarCliente.disabled = false;
    inputBuscarCliente.value = "";
    inputBuscarCliente.focus();
  }
}
