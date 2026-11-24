<?php $paginaActual = basename($_SERVER['PHP_SELF']); ?>
<header>
    <nav>
        <div class="nav-principal">
            <li>
                <a href="index.php" class="<?php echo $paginaActual === 'index.php' ? 'activo' : ''; ?>">
                   <span class="material-symbols-outlined">shopping_cart</span>
                    <span>Vender</span>
                </a>
            </li>
            <li>
                <a href="productos.php" class="<?php echo $paginaActual === 'productos.php' ? 'activo' : ''; ?>">
                    <span class="material-symbols-outlined">package_2</span>
                    <span>Productos</span>
                </a>
            </li>
            <li>
                <a href="clientes.php" class="<?php echo $paginaActual === 'clientes.php' ? 'activo' : ''; ?>">
                    <span class="material-symbols-outlined">group</span>
                    <span>Clientes</span>
                </a>
            </li>
            <li>
                <a href="ventas.php" class="<?php echo $paginaActual === 'ventas.php' ? 'activo' : ''; ?>">
                    <span class="material-symbols-outlined">receipt</span>
                    <span>Ventas</span>
                </a>
            </li>
            <li>
                <a href="informes.php" class="<?php echo $paginaActual === 'informes.php' ? 'activo' : ''; ?>">
                   <span class="material-symbols-outlined">bar_chart</span>
                    <span>Informes</span>
                </a>
            </li>
            <?php if ($_SESSION["rol"] === "administrador"): ?>
                <li>
                    <a href="usuarios.php" class="<?php echo $paginaActual === 'usuarios.php' ? 'activo' : ''; ?>">
                       <span class="material-symbols-outlined">manage_accounts</span>
                        <span>Usuarios</span>
                    </a>
                </li>
            <?php endif; ?>
        </div>
        <div class="nav-cierre">
            <li><a href="controllers/logout.php" id="cerrar-sesion">Cerrar sesión</a></li>
        </div>
    </nav>
</header>