const busquedaProducto = document.getElementById("busqueda-producto");
const listaProductos = document.getElementById("lista-productos");
const totalVenta = document.getElementById("total-venta");
const inputPagoCon = document.getElementById("pago-con");
const cambioDinero = document.getElementById("cambio-dinero");
const botonCancelar = document.getElementById("cancelar-venta");
const botonRegistrarVenta = document.getElementById("registrar-venta");
const botonLimpiar = document.getElementById("btn-limpiar-texto");
const tablaVenta = document.getElementById("productos-vender");

busquedaProducto.addEventListener("input", buscarProductos);
busquedaProducto.addEventListener("keydown", buscarCodigoBarras);
inputPagoCon.addEventListener("input", calcularCambio);
botonCancelar.addEventListener("click", cancelarVenta);
botonRegistrarVenta.addEventListener("click", registrarVenta);

async function buscarProductos() {
    const texto = busquedaProducto.value.trim();

    if (texto === "") {
        listaProductos.style.display = "none";
        listaProductos.innerHTML = "";
        return;
    }

    const respuesta = await fetch("php/listar_productos.php?buscar=" + texto);
    const productos = await respuesta.json();

    listaProductos.innerHTML = "";

    if (productos.length === 0) {
        listaProductos.style.display = "none";
        return;
    }

    productos.forEach(producto => {

        const div = document.createElement("div");

        div.classList.add("item-producto");

        div.textContent = `${producto.codigo_barras} | ${producto.nombre} | $${producto.precio_venta}`;

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

            fila.cells[4].textContent = producto.precio_venta * inputCantidad.value;

            calcularTotalVenta();

            limpiarBusqueda();

            return;
        }
    }

    const fila = document.createElement("tr");

    fila.dataset.idProducto = producto.id_producto;
    fila.dataset.precioCompra = producto.precio_compra;

    fila.innerHTML = `
        <td>${producto.codigo_barras}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio_venta}</td>
        <td><input type="number" class="cantidad" value="1" min="1" style="width:60px;"></td>
        <td class="total-fila">${producto.precio_venta}</td>
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

        fila.querySelector(".total-fila").textContent = total;

        calcularTotalVenta();
    });

    botonEliminar.addEventListener("click", function () {
        fila.remove();
        calcularTotalVenta();
    });

    limpiarBusqueda();
};

async function buscarCodigoBarras(evento) {

    if (evento.key !== "Enter") {
        return;
    }

    evento.preventDefault();

    const codigo = busquedaProducto.value.trim();

    if (codigo === "") {
        return;
    }

    const respuesta = await fetch("php/listar_productos.php?buscar=" + codigo);
    const productos = await respuesta.json();
    const producto = productos.find(p => p.codigo_barras === codigo);

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
        total += Number(fila.querySelector(".total-fila").textContent);
    }

    totalVenta.textContent = total;
    
    calcularCambio();
}

function calcularCambio() {
    const total = Number(totalVenta.textContent);
    const pago = Number(inputPagoCon.value);

    if (pago < total) {
        cambioDinero.textContent = 0;
    } else {
    cambioDinero.textContent = `$${Number(pago - total).toLocaleString("es-CO")}`;
    };
};

function cancelarVenta(){
    tablaVenta.innerHTML = "";
    totalVenta.textContent = 0;
    inputPagoCon.value = "";
    cambioDinero.textContent = 0;
    busquedaProducto.value = "";
    busquedaProducto.focus();
    listaProductos.innerHTML = "";
    listaProductos.style.display = "none";
};

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
            precioVenta: Number(fila.cells[2].textContent),
            cantidad: Number(fila.querySelector(".cantidad").value),
            subtotal: Number(fila.querySelector(".total-fila").textContent)
        });
    }

    const venta = {
        total: Number(totalVenta.textContent),
        pagoCon: Number(inputPagoCon.value),
        cambio: Number(cambioDinero.textContent),
        productos: productos
    };

    const respuesta = await fetch("php/registrar_venta.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venta)
    });

    const resultado = await respuesta.json();

    alert(resultado.mensaje);

    cancelarVenta();
}

botonLimpiar.addEventListener("click", function(){
    busquedaProducto.value = "";
    busquedaProducto.focus();
    listaProductos.style.display = "none";
});

function limpiarBusqueda() {
    listaProductos.innerHTML = "";
    listaProductos.style.display = "none";
    busquedaProducto.value = "";
    busquedaProducto.focus();
}
