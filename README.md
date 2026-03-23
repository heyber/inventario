HESERUCI App

Plantilla base para el desarrollo de aplicaciones web utilizando Next.js, Prisma, PostgreSQL y Docker.
Este repositorio está diseñado como punto de partida reutilizable para nuevos proyectos.

Stack Tecnológico
Next.js (App Router)
React
Tailwind CSS
Prisma ORM
PostgreSQL
Docker y Docker Compose
Arquitectura

El proyecto se organiza en los siguientes módulos:

/app: Capa de frontend (interfaces y páginas)
/app/api: Endpoints del backend (API routes)
/prisma: Esquema y configuración de base de datos
docker-compose.yml: Definición de servicios y orquestación
Entorno con Docker

La aplicación se ejecuta mediante dos servicios principales:

app: Aplicación Next.js
db: Base de datos PostgreSQL
Configuración de conexión
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/inventarios_db"
Puesta en marcha
1. Construcción y ejecución de contenedores
docker-compose up --build
2. Generación del cliente Prisma
docker exec -it trabajosss-app-1 sh
npx prisma generate
npx prisma db push
3. Acceso a la aplicación
http://localhost:3001
Funcionalidades actuales
Registro de usuarios
Autenticación básica contra base de datos
Redirección a panel principal
Persistencia simple mediante localStorage
Vista de dashboard inicial
Rutas disponibles
Ruta	Descripción
/	Página principal
/login	Inicio de sesión
/register	Registro de usuario
/dashboard	Panel de usuario
/api/login	Endpoint de autenticación
/api/register	Endpoint de registro
Modelo de datos (Prisma)
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String

  city      String?
  company   String?
  phone     String?

  createdAt DateTime @default(now())

  products  Product[]
}
Objetivo

Esta plantilla está orientada a:

Acelerar la creación de aplicaciones web
Facilitar la integración con bases de datos
Proveer una base inicial para sistemas con autenticación
Servir como punto de partida para arquitecturas escalables
Estado del proyecto
En desarrollo
Implementación de seguridad básica
No incluye aún hashing de contraseñas ni manejo de tokens
Próximas mejoras
Implementación de autenticación segura (JWT o cookies)
Encriptación de contraseñas
Gestión de sesiones
Mejora de interfaz de usuario
Protección de rutas
Consideraciones técnicas
Arquitectura basada en contenedores (Docker)
Prisma como ORM principal
Sin dependencias externas de autenticación
Enfoque en simplicidad y mantenibilidad
Despliegue

Para entornos de producción se recomienda:

Configurar variables de entorno seguras
Utilizar un servicio de base de datos gestionado
Implementar medidas de seguridad (hashing, autenticación robusta, protección de endpoints)