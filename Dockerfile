FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm install

# Copiar código
COPY . .

# Generar Prisma client
RUN npx prisma generate

# Exponer puerto
EXPOSE 3000

# 👇 MODO DEV (clave)
CMD ["npm", "run", "dev"]