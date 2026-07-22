const formularioProductos = document.getElementById('agregar-producto');
const tablaProductos = document.getElementById('productos-registrados');
const botonGuardar = document.getElementById('btn-agregar-producto');
const botonCancelar = document.getElementById('cancelar');
const buscarProducto = document.getElementById('buscar-producto');

let idEditar = null;
let listaProductos = [];
listarProductos();

formularioProductos.addEventListener('submit', function (event) {
    event.preventDefault();

    const datos = {
        idProducto: idEditar,
        codigoBarras: document.getElementById('codigo-barras').value,
        nombre: document.getElementById('nombre').value,
        precioCompra: document.getElementById('precio-compra').value,
        precioVenta: document.getElementById('precio-venta').value
    };

    let archivo = "php/agregar_producto.php";

    if (idEditar !== null) {
        archivo = "php/editar_producto.php";
    }

    if (datos.codigoBarras.trim() === '' || datos.nombre.trim() === '' || datos.precioCompra.trim() === '' || datos.precioVenta.trim() === '') {
        alert('Por favor, complete todos los campos');
        return;
    }

    fetch(archivo, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(respuesta => respuesta.text())
        .then(resultado => {
            console.log(resultado);
            alert(resultado);

            if (
                resultado === "Producto agregado correctamente." ||
                resultado === "Producto reactivado correctamente." ||
                resultado === "Producto actualizado correctamente."
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
    fetch("php/listar_productos.php?buscar=" + encodeURIComponent(busqueda))

        .then(respuesta => respuesta.json())

        .then(productos => {
            listaProductos = productos;

            const cantidadProductos = document.getElementById("cantidad-productos");
            cantidadProductos.textContent = productos.length;

            tablaProductos.innerHTML = "";

            productos.forEach(producto => {
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
                        u => u.id_producto == idEditar
                    );

                    document.getElementById('codigo-barras').value = producto.codigo_barras;
                    document.getElementById('nombre').value = producto.nombre;
                    document.getElementById('precio-compra').value = producto.precio_compra;
                    document.getElementById('precio-venta').value = producto.precio_venta;
                });

                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.dataset.id_producto = producto.id_producto;
                btnEliminar.classList.add("btn-eliminar");

                btnEliminar.addEventListener("click", function () {
                    const idProducto = btnEliminar.dataset.id_producto;

                    console.log(idProducto);

                    if (!confirm(`¿Está seguro de que desea eliminar el producto: ${producto.nombre}?`)) {
                        return;
                    }

                    fetch("php/eliminar_producto.php", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ idProducto: idProducto })
                    })
                        .then(respuesta => respuesta.text())
                        .then(resultado => {
                            console.log(resultado);
                            alert("Producto eliminado")
                            listarProductos();
                        });
                });

                tdAcciones.appendChild(btnEditar);
                tdAcciones.appendChild(btnEliminar);
                fila.appendChild(tdAcciones);

                tablaProductos.appendChild(fila);
            });
        });
}

botonCancelar.addEventListener("click", function () {
    formularioProductos.reset()
    idEditar = null;
    botonGuardar.textContent = "Agregar";
    buscarProducto.value = "";
    listarProductos();
});

buscarProducto.addEventListener("input", function () {
    listarProductos(buscarProducto.value);
});