# 🛒 SimplePOS

Sistema de Punto de Venta (POS) desarrollado con **PHP, MySQL, JavaScript, HTML y CSS**.

Este proyecto comenzó como un trabajo académico del **Técnico Laboral en Asistente en Análisis y Desarrollo de Software** y posteriormente ha sido mejorado y refactorizado como un proyecto personal para aplicar buenas prácticas de desarrollo y ampliar sus funcionalidades.

---

## ✨ Características

- 🔐 Inicio de sesión con autenticación segura mediante `password_hash()` y `password_verify()`.
- 📦 Gestión de productos (crear, editar y desactivar).
- 🔍 Búsqueda de productos por nombre o código de barras.
- 🛒 Registro de ventas con múltiples productos.
- 💰 Cálculo automático del total de la venta y del cambio.
- 📈 Cálculo automático de la ganancia por producto.
- 📅 Consulta de ventas por fecha.
- 📋 Visualización del detalle de cada venta.
- ❌ Eliminación de productos de una venta.
- 🗑️ Eliminación completa de ventas.
- 🔒 Uso de Prepared Statements para prevenir inyección SQL.

---

## 🛠 Tecnologías utilizadas

- PHP
- MySQL
- JavaScript
- HTML5
- CSS3
- Git
- GitHub

---

## 📂 Estructura del proyecto

```text
SimplePOS/
│
├── assets/
│   ├── css/
│   └── js/
│
├── config/
│   └── conexion.php
│
├── database/
│   └── punto_venta_php.sql
│
├── controllers/
│
├── header.php
├── index.php
├── login.php
├── productos.php
├── ventas.php
└── README.md
```

---

## ⚙️ Instalación

1. Clonar el repositorio.
2. Copiar el proyecto a la carpeta `htdocs` de XAMPP.
3. Iniciar Apache y MySQL.
4. Crear una base de datos llamada `punto_venta_php`.
5. Importar el archivo:

```
database/punto_venta_php.sql
```

6. Abrir en el navegador:

```
http://localhost/PUNTO_VENTA_PHP
```

---

## 👤 Usuario de demostración

Usuario:

```
admin
```

Contraseña:

```
admin123
```

> La contraseña almacenada en la base de datos corresponde a un hash generado con `password_hash()`.

---

## 🚀 Funcionalidades futuras

- Control de inventario (stock).
- Gestión de clientes.
- Reportes en PDF.
- Dashboard con estadísticas.
- Exportación a Excel.
- Roles de usuario.
- Configuración del negocio.
- Impresión de facturas.

---

## 👨‍💻 Autor

Desarrollado por **Duver Muñoz**.

Proyecto desarrollado inicialmente como trabajo académico y posteriormente ampliado como proyecto personal.

---

## 📄 Licencia

Este proyecto se publica con fines educativos y como parte de un portafolio de desarrollo de software.