CREATE DATABASE punto_venta_php;

USE punto_venta_php;


-- =====================================================
-- TABLA: productos
-- =====================================================

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    codigo_barras VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    precio_compra INT NOT NULL,
    precio_venta INT NOT NULL,
    estado TINYINT(1) NOT NULL DEFAULT 1
);


-- =====================================================
-- TABLA: clientes
-- =====================================================

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    celular VARCHAR(20),
    correo VARCHAR(100),
    estado TINYINT(1) NOT NULL DEFAULT 1
);


-- =====================================================
-- TABLA: ventas
-- =====================================================

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total INT NOT NULL,

    tipo_venta ENUM('CONTADO', 'CREDITO') NOT NULL,

    id_cliente INT NULL,

    estado ENUM('PENDIENTE', 'PAGADA') NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT fk_venta_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
);


-- =====================================================
-- TABLA: detalle_venta
-- =====================================================

CREATE TABLE detalle_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,

    id_venta INT NOT NULL,
    id_producto INT NOT NULL,

    codigo_barras VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    precio_compra INT NOT NULL,
    precio_venta INT NOT NULL,
    ganancia INT NOT NULL,

    cantidad INT NOT NULL,
    subtotal INT NOT NULL,

    CONSTRAINT fk_detalle_venta
        FOREIGN KEY (id_venta)
        REFERENCES ventas(id_venta),

    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);


-- =====================================================
-- TABLA: pagos
-- =====================================================

CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,

    id_venta INT NOT NULL,

    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    monto INT NOT NULL,

    CONSTRAINT fk_pago_venta
        FOREIGN KEY (id_venta)
        REFERENCES ventas(id_venta)
);


-- =====================================================
-- TABLA: usuarios
-- =====================================================

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


-- =====================================================
-- PRODUCTOS DE PRUEBA
-- =====================================================

INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7702028100061","ACEITE RICAPALMA X 1000",9720,11500);
INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7702028100047","ACEITE RICA PALMA X 500",5300,6500);
INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7702006202350","ACONDICIONADOR SAVITAL X 22",661,1000);
INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7708984708709","AGUA POOL X 600 ML",625,2000);
INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7702049000449","AGUARDIENTE ANTIOQUEÑO 1/2",23140,29500);
INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7702049000548","AGUARDIENTE ANTIOQUEÑO LIGH 1/2",24586,30500);
INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES ("7702049001514","AGUARDIENTE ANTIOQUEÑO LIGH LITRO",49900,62000);


-- =====================================================
-- USUARIO ADMINISTRADOR
-- =====================================================

INSERT INTO usuarios (usuario, password)
VALUES (
    'admin',
    '$2y$10$GfBDIzECdUJJETJRXLmnle1iHgRZ1/wQaDAKb/vMY6QsQpHW4bbtu'
);