<?php

session_start();

//Recomendable vaciar el arreglo antes de destruir la sesión
$_SESSION = [];

session_destroy();

header("location: ../login.php");

exit();