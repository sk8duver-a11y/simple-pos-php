FROM dunglas/frankenphp:1.4-php8.4

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install mysqli pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiar la aplicación
COPY . /app

# Permisos
RUN chown -R www-data:www-data /app/public