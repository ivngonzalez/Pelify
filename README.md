# Pelify 

**Pelify** es una plataforma web de recomendación de cine y administración de usuarios diseñada para solucionar la indecisión al elegir contenido audiovisual. La aplicación ofrece sugerencias personalizadas basadas en criterios específicos y facilita el descubrimiento de nuevos lanzamientos.

##  Finalidad y Objetivos
La finalidad del proyecto es desarrollar una solución funcional que consuma servicios externos, gestione datos propios y ofrezca una interfaz intuitiva.

* **Diseñar** la arquitectura de la aplicación web.
* **Desarrollar** un backend sólido y un frontend responsive.
* **Gestionar** usuarios, roles, permisos y autenticación.
* **Integrar** una base de datos PostgreSQL para el almacenamiento de información.
* **Desplegar** la aplicación en un servidor web (Render).

##  Funcionalidades
* **Registro y Autenticación**: Control de acceso y gestión de perfiles.
* **Recomendador Personalizado**: Formulario dinámico con filtros de género, duración y año mediante la API de TMDB.
* **Perfil de Usuario**:
  * **Watchlist**: Lista de películas para ver más tarde.
  * **Historial**: Registro de recomendaciones previas.
* **Ficha Detallada**: Información completa con sinopsis, reparto y puntuación.

##  Stack Tecnológico

### Backend
* **Lenguaje:** Java 17.
* **Framework:** Spring Boot 3.
* **Persistencia:** Spring Data JPA + Hibernate.
* **Seguridad:** Spring Security (Login + Roles; Sesión o JWT).
* **API:** REST (@RestController).
* **Gestión de dependencias:** Maven.
* **Testing:** JUnit 5 + Mockito.

### Frontend
* **Librería Principal:** React (con Vite).
* **Lenguajes:** HTML5, CSS3, JavaScript (ES6).
* **Estilos:** Bootstrap o Tailwind CSS.
* **Consumo de API:** Fetch / Axios.

### Base de Datos y Entorno
* **Producción:** PostgreSQL.
* **Desarrollo:** H2 o MySQL.
* **Despliegue:** Render (en evaluación)
