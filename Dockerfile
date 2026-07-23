FROM php:8.4-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install mysqli pdo_mysql \
    && a2enmod rewrite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiar el proyecto
COPY . /var/www/html/

# Permisos
RUN chown -R www-data:www-data /var/www/html

# Directorio de trabajo
WORKDIR /var/www/html

EXPOSE 80