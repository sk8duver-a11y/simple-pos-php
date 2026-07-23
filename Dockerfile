FROM php:8.4-apache

# Instalar la extensión mysqli
RUN docker-php-ext-install mysqli

# Habilitar mod_rewrite (útil para futuras mejoras)
RUN a2enmod rewrite

# Copiar el proyecto al servidor web
COPY . /var/www/html/

# Dar permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80